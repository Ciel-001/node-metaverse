// This file has been automatically generated by writeMessageClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class ObjectDescriptionMessage implements MessageBase
{
    name = 'ObjectDescription';
    messageFlags = MessageFlags.Zerocoded | MessageFlags.FrequencyLow;
    id = Message.ObjectDescription;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    ObjectData: {
        LocalID: number;
        Description: string;
    }[];

    getSize(): number
    {
        return ((this.calculateVarVarSize(this.ObjectData, 'Description', 1) + 4) * this.ObjectData.length) + 33;
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
        this.AgentData['SessionID'].writeToBuffer(buf, pos);
        pos += 16;
        const count = this.ObjectData.length;
        buf.writeUInt8(this.ObjectData.length, pos++);
        for (let i = 0; i < count; i++)
        {
            buf.writeUInt32LE(this.ObjectData[i]['LocalID'], pos);
            pos += 4;
            buf.writeUInt8(this.ObjectData[i]['Description'].length, pos++);
            buf.write(this.ObjectData[i]['Description'], pos);
            pos += this.ObjectData[i]['Description'].length;
        }
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
        const count = buf.readUInt8(pos++);
        this.ObjectData = [];
        for (let i = 0; i < count; i++)
        {
            const newObjObjectData: {
                LocalID: number,
                Description: string
            } = {
                LocalID: 0,
                Description: ''
            };
            newObjObjectData['LocalID'] = buf.readUInt32LE(pos);
            pos += 4;
            varLength = buf.readUInt8(pos++);
            newObjObjectData['Description'] = buf.toString('utf8', pos, pos + (varLength - 1));
            pos += varLength;
            this.ObjectData.push(newObjObjectData);
        }
        return pos - startPos;
    }
}

