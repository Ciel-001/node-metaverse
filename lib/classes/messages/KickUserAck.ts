// This file has been automatically generated by writeMessageClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class KickUserAckMessage implements MessageBase
{
    name = 'KickUserAck';
    messageFlags = MessageFlags.Trusted | MessageFlags.FrequencyLow;
    id = Message.KickUserAck;

    UserInfo: {
        SessionID: UUID;
        Flags: number;
    };

    getSize(): number
    {
        return 20;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        this.UserInfo['SessionID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeUInt32LE(this.UserInfo['Flags'], pos);
        pos += 4;
        return pos - startPos;
    }

    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let varLength = 0;
        const newObjUserInfo: {
            SessionID: UUID,
            Flags: number
        } = {
            SessionID: UUID.zero(),
            Flags: 0
        };
        newObjUserInfo['SessionID'] = new UUID(buf, pos);
        pos += 16;
        newObjUserInfo['Flags'] = buf.readUInt32LE(pos);
        pos += 4;
        this.UserInfo = newObjUserInfo;
        return pos - startPos;
    }
}

