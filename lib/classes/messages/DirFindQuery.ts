// This file has been automatically generated by writeMessageClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class DirFindQueryMessage implements MessageBase
{
    name = 'DirFindQuery';
    messageFlags = MessageFlags.Zerocoded | MessageFlags.FrequencyLow;
    id = Message.DirFindQuery;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    QueryData: {
        QueryID: UUID;
        QueryText: string;
        QueryFlags: number;
        QueryStart: number;
    };

    getSize(): number
    {
        return (this.QueryData['QueryText'].length + 1) + 56;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        this.AgentData['AgentID'].writeToBuffer(buf, pos);
        pos += 16;
        this.AgentData['SessionID'].writeToBuffer(buf, pos);
        pos += 16;
        this.QueryData['QueryID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeUInt8(this.QueryData['QueryText'].length, pos++);
        buf.write(this.QueryData['QueryText'], pos);
        pos += this.QueryData['QueryText'].length;
        buf.writeUInt32LE(this.QueryData['QueryFlags'], pos);
        pos += 4;
        buf.writeInt32LE(this.QueryData['QueryStart'], pos);
        pos += 4;
        return pos - startPos;
    }

    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let varLength = 0;
        const newObjAgentData: {
            AgentID: UUID,
            SessionID: UUID
        } = {
            AgentID: UUID.zero(),
            SessionID: UUID.zero()
        };
        newObjAgentData['AgentID'] = new UUID(buf, pos);
        pos += 16;
        newObjAgentData['SessionID'] = new UUID(buf, pos);
        pos += 16;
        this.AgentData = newObjAgentData;
        const newObjQueryData: {
            QueryID: UUID,
            QueryText: string,
            QueryFlags: number,
            QueryStart: number
        } = {
            QueryID: UUID.zero(),
            QueryText: '',
            QueryFlags: 0,
            QueryStart: 0
        };
        newObjQueryData['QueryID'] = new UUID(buf, pos);
        pos += 16;
        varLength = buf.readUInt8(pos++);
        newObjQueryData['QueryText'] = buf.toString('utf8', pos, pos + (varLength - 1));
        pos += varLength;
        newObjQueryData['QueryFlags'] = buf.readUInt32LE(pos);
        pos += 4;
        newObjQueryData['QueryStart'] = buf.readInt32LE(pos);
        pos += 4;
        this.QueryData = newObjQueryData;
        return pos - startPos;
    }
}

