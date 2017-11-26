// This file has been automatically generated by writeMessageClasses.js

import {UUID} from '../UUID';
import {Vector3} from '../Vector3';
import Long = require('long');
import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class DataHomeLocationReplyMessage implements MessageBase
{
    name = 'DataHomeLocationReply';
    messageFlags = MessageFlags.Trusted | MessageFlags.FrequencyLow;
    id = Message.DataHomeLocationReply;

    Info: {
        AgentID: UUID;
        RegionHandle: Long;
        Position: Vector3;
        LookAt: Vector3;
    };

    getSize(): number
    {
        return 48;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        this.Info['AgentID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeInt32LE(this.Info['RegionHandle'].low, pos);
        pos += 4;
        buf.writeInt32LE(this.Info['RegionHandle'].high, pos);
        pos += 4;
        this.Info['Position'].writeToBuffer(buf, pos, false);
        pos += 12;
        this.Info['LookAt'].writeToBuffer(buf, pos, false);
        pos += 12;
        return pos - startPos;
    }

    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let varLength = 0;
        const newObjInfo: {
            AgentID: UUID,
            RegionHandle: Long,
            Position: Vector3,
            LookAt: Vector3
        } = {
            AgentID: UUID.zero(),
            RegionHandle: Long.ZERO,
            Position: Vector3.getZero(),
            LookAt: Vector3.getZero()
        };
        newObjInfo['AgentID'] = new UUID(buf, pos);
        pos += 16;
        newObjInfo['RegionHandle'] = new Long(buf.readInt32LE(pos), buf.readInt32LE(pos+4));
        pos += 8;
        newObjInfo['Position'] = new Vector3(buf, pos, false);
        pos += 12;
        newObjInfo['LookAt'] = new Vector3(buf, pos, false);
        pos += 12;
        this.Info = newObjInfo;
        return pos - startPos;
    }
}

