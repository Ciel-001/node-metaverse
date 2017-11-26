// This file has been automatically generated by writeMessageClasses.js

import {UUID} from '../UUID';
import Long = require('long');
import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class GroupProfileReplyMessage implements MessageBase
{
    name = 'GroupProfileReply';
    messageFlags = MessageFlags.Trusted | MessageFlags.Zerocoded | MessageFlags.FrequencyLow;
    id = Message.GroupProfileReply;

    AgentData: {
        AgentID: UUID;
    };
    GroupData: {
        GroupID: UUID;
        Name: string;
        Charter: string;
        ShowInList: boolean;
        MemberTitle: string;
        PowersMask: Long;
        InsigniaID: UUID;
        FounderID: UUID;
        MembershipFee: number;
        OpenEnrollment: boolean;
        Money: number;
        GroupMembershipCount: number;
        GroupRolesCount: number;
        AllowPublish: boolean;
        MaturePublish: boolean;
        OwnerRole: UUID;
    };

    getSize(): number
    {
        return (this.GroupData['Name'].length + 1 + this.GroupData['Charter'].length + 2 + this.GroupData['MemberTitle'].length + 1) + 108;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        this.AgentData['AgentID'].writeToBuffer(buf, pos);
        pos += 16;
        this.GroupData['GroupID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeUInt8(this.GroupData['Name'].length, pos++);
        buf.write(this.GroupData['Name'], pos);
        pos += this.GroupData['Name'].length;
        buf.writeUInt16LE(this.GroupData['Charter'].length, pos);
        pos += 2;
        buf.write(this.GroupData['Charter'], pos);
        pos += this.GroupData['Charter'].length;
        buf.writeUInt8((this.GroupData['ShowInList']) ? 1 : 0, pos++);
        buf.writeUInt8(this.GroupData['MemberTitle'].length, pos++);
        buf.write(this.GroupData['MemberTitle'], pos);
        pos += this.GroupData['MemberTitle'].length;
        buf.writeInt32LE(this.GroupData['PowersMask'].low, pos);
        pos += 4;
        buf.writeInt32LE(this.GroupData['PowersMask'].high, pos);
        pos += 4;
        this.GroupData['InsigniaID'].writeToBuffer(buf, pos);
        pos += 16;
        this.GroupData['FounderID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeInt32LE(this.GroupData['MembershipFee'], pos);
        pos += 4;
        buf.writeUInt8((this.GroupData['OpenEnrollment']) ? 1 : 0, pos++);
        buf.writeInt32LE(this.GroupData['Money'], pos);
        pos += 4;
        buf.writeInt32LE(this.GroupData['GroupMembershipCount'], pos);
        pos += 4;
        buf.writeInt32LE(this.GroupData['GroupRolesCount'], pos);
        pos += 4;
        buf.writeUInt8((this.GroupData['AllowPublish']) ? 1 : 0, pos++);
        buf.writeUInt8((this.GroupData['MaturePublish']) ? 1 : 0, pos++);
        this.GroupData['OwnerRole'].writeToBuffer(buf, pos);
        pos += 16;
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
        const newObjGroupData: {
            GroupID: UUID,
            Name: string,
            Charter: string,
            ShowInList: boolean,
            MemberTitle: string,
            PowersMask: Long,
            InsigniaID: UUID,
            FounderID: UUID,
            MembershipFee: number,
            OpenEnrollment: boolean,
            Money: number,
            GroupMembershipCount: number,
            GroupRolesCount: number,
            AllowPublish: boolean,
            MaturePublish: boolean,
            OwnerRole: UUID
        } = {
            GroupID: UUID.zero(),
            Name: '',
            Charter: '',
            ShowInList: false,
            MemberTitle: '',
            PowersMask: Long.ZERO,
            InsigniaID: UUID.zero(),
            FounderID: UUID.zero(),
            MembershipFee: 0,
            OpenEnrollment: false,
            Money: 0,
            GroupMembershipCount: 0,
            GroupRolesCount: 0,
            AllowPublish: false,
            MaturePublish: false,
            OwnerRole: UUID.zero()
        };
        newObjGroupData['GroupID'] = new UUID(buf, pos);
        pos += 16;
        varLength = buf.readUInt8(pos++);
        newObjGroupData['Name'] = buf.toString('utf8', pos, pos + (varLength - 1));
        pos += varLength;
        varLength = buf.readUInt16LE(pos);
        pos += 2;
        newObjGroupData['Charter'] = buf.toString('utf8', pos, pos + (varLength - 1));
        pos += varLength;
        newObjGroupData['ShowInList'] = (buf.readUInt8(pos++) === 1);
        varLength = buf.readUInt8(pos++);
        newObjGroupData['MemberTitle'] = buf.toString('utf8', pos, pos + (varLength - 1));
        pos += varLength;
        newObjGroupData['PowersMask'] = new Long(buf.readInt32LE(pos), buf.readInt32LE(pos+4));
        pos += 8;
        newObjGroupData['InsigniaID'] = new UUID(buf, pos);
        pos += 16;
        newObjGroupData['FounderID'] = new UUID(buf, pos);
        pos += 16;
        newObjGroupData['MembershipFee'] = buf.readInt32LE(pos);
        pos += 4;
        newObjGroupData['OpenEnrollment'] = (buf.readUInt8(pos++) === 1);
        newObjGroupData['Money'] = buf.readInt32LE(pos);
        pos += 4;
        newObjGroupData['GroupMembershipCount'] = buf.readInt32LE(pos);
        pos += 4;
        newObjGroupData['GroupRolesCount'] = buf.readInt32LE(pos);
        pos += 4;
        newObjGroupData['AllowPublish'] = (buf.readUInt8(pos++) === 1);
        newObjGroupData['MaturePublish'] = (buf.readUInt8(pos++) === 1);
        newObjGroupData['OwnerRole'] = new UUID(buf, pos);
        pos += 16;
        this.GroupData = newObjGroupData;
        return pos - startPos;
    }
}

