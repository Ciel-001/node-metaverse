// This file has been automatically generated by writeMessageClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class ModifyLandMessage implements MessageBase
{
    name = 'ModifyLand';
    messageFlags = MessageFlags.Zerocoded | MessageFlags.FrequencyLow;
    id = Message.ModifyLand;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    ModifyBlock: {
        Action: number;
        BrushSize: number;
        Seconds: number;
        Height: number;
    };
    ParcelData: {
        LocalID: number;
        West: number;
        South: number;
        East: number;
        North: number;
    }[];
    ModifyBlockExtended: {
        BrushSize: number;
    }[];

    getSize(): number
    {
        return ((20) * this.ParcelData.length) + ((4) * this.ModifyBlockExtended.length) + 44;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        this.AgentData['AgentID'].writeToBuffer(buf, pos);
        pos += 16;
        this.AgentData['SessionID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeUInt8(this.ModifyBlock['Action'], pos++);
        buf.writeUInt8(this.ModifyBlock['BrushSize'], pos++);
        buf.writeFloatLE(this.ModifyBlock['Seconds'], pos);
        pos += 4;
        buf.writeFloatLE(this.ModifyBlock['Height'], pos);
        pos += 4;
        let count = this.ParcelData.length;
        buf.writeUInt8(this.ParcelData.length, pos++);
        for (let i = 0; i < count; i++)
        {
            buf.writeInt32LE(this.ParcelData[i]['LocalID'], pos);
            pos += 4;
            buf.writeFloatLE(this.ParcelData[i]['West'], pos);
            pos += 4;
            buf.writeFloatLE(this.ParcelData[i]['South'], pos);
            pos += 4;
            buf.writeFloatLE(this.ParcelData[i]['East'], pos);
            pos += 4;
            buf.writeFloatLE(this.ParcelData[i]['North'], pos);
            pos += 4;
        }
        count = this.ModifyBlockExtended.length;
        buf.writeUInt8(this.ModifyBlockExtended.length, pos++);
        for (let i = 0; i < count; i++)
        {
            buf.writeFloatLE(this.ModifyBlockExtended[i]['BrushSize'], pos);
            pos += 4;
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
        const newObjModifyBlock: {
            Action: number,
            BrushSize: number,
            Seconds: number,
            Height: number
        } = {
            Action: 0,
            BrushSize: 0,
            Seconds: 0,
            Height: 0
        };
        newObjModifyBlock['Action'] = buf.readUInt8(pos++);
        newObjModifyBlock['BrushSize'] = buf.readUInt8(pos++);
        newObjModifyBlock['Seconds'] = buf.readFloatLE(pos);
        pos += 4;
        newObjModifyBlock['Height'] = buf.readFloatLE(pos);
        pos += 4;
        this.ModifyBlock = newObjModifyBlock;
        let count = buf.readUInt8(pos++);
        this.ParcelData = [];
        for (let i = 0; i < count; i++)
        {
            const newObjParcelData: {
                LocalID: number,
                West: number,
                South: number,
                East: number,
                North: number
            } = {
                LocalID: 0,
                West: 0,
                South: 0,
                East: 0,
                North: 0
            };
            newObjParcelData['LocalID'] = buf.readInt32LE(pos);
            pos += 4;
            newObjParcelData['West'] = buf.readFloatLE(pos);
            pos += 4;
            newObjParcelData['South'] = buf.readFloatLE(pos);
            pos += 4;
            newObjParcelData['East'] = buf.readFloatLE(pos);
            pos += 4;
            newObjParcelData['North'] = buf.readFloatLE(pos);
            pos += 4;
            this.ParcelData.push(newObjParcelData);
        }
        count = buf.readUInt8(pos++);
        this.ModifyBlockExtended = [];
        for (let i = 0; i < count; i++)
        {
            const newObjModifyBlockExtended: {
                BrushSize: number
            } = {
                BrushSize: 0
            };
            newObjModifyBlockExtended['BrushSize'] = buf.readFloatLE(pos);
            pos += 4;
            this.ModifyBlockExtended.push(newObjModifyBlockExtended);
        }
        return pos - startPos;
    }
}

