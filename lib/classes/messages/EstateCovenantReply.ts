// This file has been automatically generated by writeMessageClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class EstateCovenantReplyMessage implements MessageBase
{
    name = 'EstateCovenantReply';
    messageFlags = MessageFlags.Trusted | MessageFlags.FrequencyLow;
    id = Message.EstateCovenantReply;

    Data: {
        CovenantID: UUID;
        CovenantTimestamp: number;
        EstateName: string;
        EstateOwnerID: UUID;
    };

    getSize(): number
    {
        return (this.Data['EstateName'].length + 1) + 36;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        this.Data['CovenantID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeUInt32LE(this.Data['CovenantTimestamp'], pos);
        pos += 4;
        buf.writeUInt8(this.Data['EstateName'].length, pos++);
        buf.write(this.Data['EstateName'], pos);
        pos += this.Data['EstateName'].length;
        this.Data['EstateOwnerID'].writeToBuffer(buf, pos);
        pos += 16;
        return pos - startPos;
    }

    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let varLength = 0;
        const newObjData: {
            CovenantID: UUID,
            CovenantTimestamp: number,
            EstateName: string,
            EstateOwnerID: UUID
        } = {
            CovenantID: UUID.zero(),
            CovenantTimestamp: 0,
            EstateName: '',
            EstateOwnerID: UUID.zero()
        };
        newObjData['CovenantID'] = new UUID(buf, pos);
        pos += 16;
        newObjData['CovenantTimestamp'] = buf.readUInt32LE(pos);
        pos += 4;
        varLength = buf.readUInt8(pos++);
        newObjData['EstateName'] = buf.toString('utf8', pos, pos + (varLength - 1));
        pos += varLength;
        newObjData['EstateOwnerID'] = new UUID(buf, pos);
        pos += 16;
        this.Data = newObjData;
        return pos - startPos;
    }
}

