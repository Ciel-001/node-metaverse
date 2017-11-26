// This file has been automatically generated by writeMessageClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class UUIDNameRequestMessage implements MessageBase
{
    name = 'UUIDNameRequest';
    messageFlags = MessageFlags.FrequencyLow;
    id = Message.UUIDNameRequest;

    UUIDNameBlock: {
        ID: UUID;
    }[];

    getSize(): number
    {
        return ((16) * this.UUIDNameBlock.length) + 1;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        const count = this.UUIDNameBlock.length;
        buf.writeUInt8(this.UUIDNameBlock.length, pos++);
        for (let i = 0; i < count; i++)
        {
            this.UUIDNameBlock[i]['ID'].writeToBuffer(buf, pos);
            pos += 16;
        }
        return pos - startPos;
    }

    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let varLength = 0;
        const count = buf.readUInt8(pos++);
        this.UUIDNameBlock = [];
        for (let i = 0; i < count; i++)
        {
            const newObjUUIDNameBlock: {
                ID: UUID
            } = {
                ID: UUID.zero()
            };
            newObjUUIDNameBlock['ID'] = new UUID(buf, pos);
            pos += 16;
            this.UUIDNameBlock.push(newObjUUIDNameBlock);
        }
        return pos - startPos;
    }
}

