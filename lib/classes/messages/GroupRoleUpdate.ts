// This file has been automatically generated by writeMessageClasses.js

import {UUID} from '../UUID';
import Long = require('long');
import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class GroupRoleUpdateMessage implements MessageBase
{
    name = 'GroupRoleUpdate';
    messageFlags = MessageFlags.FrequencyLow;
    id = Message.GroupRoleUpdate;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
        GroupID: UUID;
    };
    RoleData: {
        RoleID: UUID;
        Name: string;
        Description: string;
        Title: string;
        Powers: Long;
        UpdateType: number;
    }[];

    getSize(): number
    {
        return ((this.calculateVarVarSize(this.RoleData, 'Name', 1) + this.calculateVarVarSize(this.RoleData, 'Description', 1) + this.calculateVarVarSize(this.RoleData, 'Title', 1) + 25) * this.RoleData.length) + 49;
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
        this.AgentData['GroupID'].writeToBuffer(buf, pos);
        pos += 16;
        const count = this.RoleData.length;
        buf.writeUInt8(this.RoleData.length, pos++);
        for (let i = 0; i < count; i++)
        {
            this.RoleData[i]['RoleID'].writeToBuffer(buf, pos);
            pos += 16;
            buf.writeUInt8(this.RoleData[i]['Name'].length, pos++);
            buf.write(this.RoleData[i]['Name'], pos);
            pos += this.RoleData[i]['Name'].length;
            buf.writeUInt8(this.RoleData[i]['Description'].length, pos++);
            buf.write(this.RoleData[i]['Description'], pos);
            pos += this.RoleData[i]['Description'].length;
            buf.writeUInt8(this.RoleData[i]['Title'].length, pos++);
            buf.write(this.RoleData[i]['Title'], pos);
            pos += this.RoleData[i]['Title'].length;
            buf.writeInt32LE(this.RoleData[i]['Powers'].low, pos);
            pos += 4;
            buf.writeInt32LE(this.RoleData[i]['Powers'].high, pos);
            pos += 4;
            buf.writeUInt8(this.RoleData[i]['UpdateType'], pos++);
        }
        return pos - startPos;
    }

    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let varLength = 0;
        const newObjAgentData: {
            AgentID: UUID,
            SessionID: UUID,
            GroupID: UUID
        } = {
            AgentID: UUID.zero(),
            SessionID: UUID.zero(),
            GroupID: UUID.zero()
        };
        newObjAgentData['AgentID'] = new UUID(buf, pos);
        pos += 16;
        newObjAgentData['SessionID'] = new UUID(buf, pos);
        pos += 16;
        newObjAgentData['GroupID'] = new UUID(buf, pos);
        pos += 16;
        this.AgentData = newObjAgentData;
        const count = buf.readUInt8(pos++);
        this.RoleData = [];
        for (let i = 0; i < count; i++)
        {
            const newObjRoleData: {
                RoleID: UUID,
                Name: string,
                Description: string,
                Title: string,
                Powers: Long,
                UpdateType: number
            } = {
                RoleID: UUID.zero(),
                Name: '',
                Description: '',
                Title: '',
                Powers: Long.ZERO,
                UpdateType: 0
            };
            newObjRoleData['RoleID'] = new UUID(buf, pos);
            pos += 16;
            varLength = buf.readUInt8(pos++);
            newObjRoleData['Name'] = buf.toString('utf8', pos, pos + (varLength - 1));
            pos += varLength;
            varLength = buf.readUInt8(pos++);
            newObjRoleData['Description'] = buf.toString('utf8', pos, pos + (varLength - 1));
            pos += varLength;
            varLength = buf.readUInt8(pos++);
            newObjRoleData['Title'] = buf.toString('utf8', pos, pos + (varLength - 1));
            pos += varLength;
            newObjRoleData['Powers'] = new Long(buf.readInt32LE(pos), buf.readInt32LE(pos+4));
            pos += 8;
            newObjRoleData['UpdateType'] = buf.readUInt8(pos++);
            this.RoleData.push(newObjRoleData);
        }
        return pos - startPos;
    }
}

