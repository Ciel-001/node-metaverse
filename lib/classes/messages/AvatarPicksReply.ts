// This file has been automatically generated by writeMessageClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class AvatarPicksReplyMessage implements MessageBase
{
    name = 'AvatarPicksReply';
    messageFlags = MessageFlags.Trusted | MessageFlags.FrequencyLow;
    id = Message.AvatarPicksReply;

    AgentData: {
        AgentID: UUID;
        TargetID: UUID;
    };
    Data: {
        PickID: UUID;
        PickName: string;
    }[];

    getSize(): number
    {
        return ((this.calculateVarVarSize(this.Data, 'PickName', 1) + 16) * this.Data.length) + 33;
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
        this.AgentData['TargetID'].writeToBuffer(buf, pos);
        pos += 16;
        const count = this.Data.length;
        buf.writeUInt8(this.Data.length, pos++);
        for (let i = 0; i < count; i++)
        {
            this.Data[i]['PickID'].writeToBuffer(buf, pos);
            pos += 16;
            buf.writeUInt8(this.Data[i]['PickName'].length, pos++);
            buf.write(this.Data[i]['PickName'], pos);
            pos += this.Data[i]['PickName'].length;
        }
        return pos - startPos;
    }

    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let varLength = 0;
        const newObjAgentData: {
            AgentID: UUID,
            TargetID: UUID
        } = {
            AgentID: UUID.zero(),
            TargetID: UUID.zero()
        };
        newObjAgentData['AgentID'] = new UUID(buf, pos);
        pos += 16;
        newObjAgentData['TargetID'] = new UUID(buf, pos);
        pos += 16;
        this.AgentData = newObjAgentData;
        const count = buf.readUInt8(pos++);
        this.Data = [];
        for (let i = 0; i < count; i++)
        {
            const newObjData: {
                PickID: UUID,
                PickName: string
            } = {
                PickID: UUID.zero(),
                PickName: ''
            };
            newObjData['PickID'] = new UUID(buf, pos);
            pos += 16;
            varLength = buf.readUInt8(pos++);
            newObjData['PickName'] = buf.toString('utf8', pos, pos + (varLength - 1));
            pos += varLength;
            this.Data.push(newObjData);
        }
        return pos - startPos;
    }
}

