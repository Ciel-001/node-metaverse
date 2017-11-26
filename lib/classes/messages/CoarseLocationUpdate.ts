// This file has been automatically generated by writeMessageClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class CoarseLocationUpdateMessage implements MessageBase
{
    name = 'CoarseLocationUpdate';
    messageFlags = MessageFlags.Trusted | MessageFlags.FrequencyMedium;
    id = Message.CoarseLocationUpdate;

    Location: {
        X: number;
        Y: number;
        Z: number;
    }[];
    Index: {
        You: number;
        Prey: number;
    };
    AgentData: {
        AgentID: UUID;
    }[];

    getSize(): number
    {
        return ((3) * this.Location.length) + ((16) * this.AgentData.length) + 6;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let count = this.Location.length;
        buf.writeUInt8(this.Location.length, pos++);
        for (let i = 0; i < count; i++)
        {
            buf.writeUInt8(this.Location[i]['X'], pos++);
            buf.writeUInt8(this.Location[i]['Y'], pos++);
            buf.writeUInt8(this.Location[i]['Z'], pos++);
        }
        buf.writeInt16LE(this.Index['You'], pos);
        pos += 2;
        buf.writeInt16LE(this.Index['Prey'], pos);
        pos += 2;
        count = this.AgentData.length;
        buf.writeUInt8(this.AgentData.length, pos++);
        for (let i = 0; i < count; i++)
        {
            this.AgentData[i]['AgentID'].writeToBuffer(buf, pos);
            pos += 16;
        }
        return pos - startPos;
    }

    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let varLength = 0;
        let count = buf.readUInt8(pos++);
        this.Location = [];
        for (let i = 0; i < count; i++)
        {
            const newObjLocation: {
                X: number,
                Y: number,
                Z: number
            } = {
                X: 0,
                Y: 0,
                Z: 0
            };
            newObjLocation['X'] = buf.readUInt8(pos++);
            newObjLocation['Y'] = buf.readUInt8(pos++);
            newObjLocation['Z'] = buf.readUInt8(pos++);
            this.Location.push(newObjLocation);
        }
        const newObjIndex: {
            You: number,
            Prey: number
        } = {
            You: 0,
            Prey: 0
        };
        newObjIndex['You'] = buf.readInt16LE(pos);
        pos += 2;
        newObjIndex['Prey'] = buf.readInt16LE(pos);
        pos += 2;
        this.Index = newObjIndex;
        count = buf.readUInt8(pos++);
        this.AgentData = [];
        for (let i = 0; i < count; i++)
        {
            const newObjAgentData: {
                AgentID: UUID
            } = {
                AgentID: UUID.zero()
            };
            newObjAgentData['AgentID'] = new UUID(buf, pos);
            pos += 16;
            this.AgentData.push(newObjAgentData);
        }
        return pos - startPos;
    }
}

