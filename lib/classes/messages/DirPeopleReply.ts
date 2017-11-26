// This file has been automatically generated by writeMessageClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class DirPeopleReplyMessage implements MessageBase
{
    name = 'DirPeopleReply';
    messageFlags = MessageFlags.Trusted | MessageFlags.Zerocoded | MessageFlags.FrequencyLow;
    id = Message.DirPeopleReply;

    AgentData: {
        AgentID: UUID;
    };
    QueryData: {
        QueryID: UUID;
    };
    QueryReplies: {
        AgentID: UUID;
        FirstName: string;
        LastName: string;
        Group: string;
        Online: boolean;
        Reputation: number;
    }[];

    getSize(): number
    {
        return ((this.calculateVarVarSize(this.QueryReplies, 'FirstName', 1) + this.calculateVarVarSize(this.QueryReplies, 'LastName', 1) + this.calculateVarVarSize(this.QueryReplies, 'Group', 1) + 21) * this.QueryReplies.length) + 33;
    }

    calculateVarVarSize(block: object[], paramName: string, extraPerVar: number): number
    {
        let size = 0;
        block.forEach((bl: any) =>
        {
            size += bl[paramName].length + extraPerVar;
        });
        return size;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        this.AgentData['AgentID'].writeToBuffer(buf, pos);
        pos += 16;
        this.QueryData['QueryID'].writeToBuffer(buf, pos);
        pos += 16;
        const count = this.QueryReplies.length;
        buf.writeUInt8(this.QueryReplies.length, pos++);
        for (let i = 0; i < count; i++)
        {
            this.QueryReplies[i]['AgentID'].writeToBuffer(buf, pos);
            pos += 16;
            buf.writeUInt8(this.QueryReplies[i]['FirstName'].length, pos++);
            buf.write(this.QueryReplies[i]['FirstName'], pos);
            pos += this.QueryReplies[i]['FirstName'].length;
            buf.writeUInt8(this.QueryReplies[i]['LastName'].length, pos++);
            buf.write(this.QueryReplies[i]['LastName'], pos);
            pos += this.QueryReplies[i]['LastName'].length;
            buf.writeUInt8(this.QueryReplies[i]['Group'].length, pos++);
            buf.write(this.QueryReplies[i]['Group'], pos);
            pos += this.QueryReplies[i]['Group'].length;
            buf.writeUInt8((this.QueryReplies[i]['Online']) ? 1 : 0, pos++);
            buf.writeInt32LE(this.QueryReplies[i]['Reputation'], pos);
            pos += 4;
        }
        return pos - startPos;
    }

    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let varLength = 0;
        const newObjAgentData: {
            AgentID: UUID
        } = {
            AgentID: UUID.zero()
        };
        newObjAgentData['AgentID'] = new UUID(buf, pos);
        pos += 16;
        this.AgentData = newObjAgentData;
        const newObjQueryData: {
            QueryID: UUID
        } = {
            QueryID: UUID.zero()
        };
        newObjQueryData['QueryID'] = new UUID(buf, pos);
        pos += 16;
        this.QueryData = newObjQueryData;
        const count = buf.readUInt8(pos++);
        this.QueryReplies = [];
        for (let i = 0; i < count; i++)
        {
            const newObjQueryReplies: {
                AgentID: UUID,
                FirstName: string,
                LastName: string,
                Group: string,
                Online: boolean,
                Reputation: number
            } = {
                AgentID: UUID.zero(),
                FirstName: '',
                LastName: '',
                Group: '',
                Online: false,
                Reputation: 0
            };
            newObjQueryReplies['AgentID'] = new UUID(buf, pos);
            pos += 16;
            varLength = buf.readUInt8(pos++);
            newObjQueryReplies['FirstName'] = buf.toString('utf8', pos, pos + (varLength - 1));
            pos += varLength;
            varLength = buf.readUInt8(pos++);
            newObjQueryReplies['LastName'] = buf.toString('utf8', pos, pos + (varLength - 1));
            pos += varLength;
            varLength = buf.readUInt8(pos++);
            newObjQueryReplies['Group'] = buf.toString('utf8', pos, pos + (varLength - 1));
            pos += varLength;
            newObjQueryReplies['Online'] = (buf.readUInt8(pos++) === 1);
            newObjQueryReplies['Reputation'] = buf.readInt32LE(pos);
            pos += 4;
            this.QueryReplies.push(newObjQueryReplies);
        }
        return pos - startPos;
    }
}

