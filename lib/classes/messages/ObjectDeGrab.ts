// This file has been automatically generated by writeMessageClasses.js

import {UUID} from '../UUID';
import {Vector3} from '../Vector3';
import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class ObjectDeGrabMessage implements MessageBase
{
    name = 'ObjectDeGrab';
    messageFlags = MessageFlags.FrequencyLow;
    id = Message.ObjectDeGrab;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    ObjectData: {
        LocalID: number;
    };
    SurfaceInfo: {
        UVCoord: Vector3;
        STCoord: Vector3;
        FaceIndex: number;
        Position: Vector3;
        Normal: Vector3;
        Binormal: Vector3;
    }[];

    getSize(): number
    {
        return ((64) * this.SurfaceInfo.length) + 37;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        this.AgentData['AgentID'].writeToBuffer(buf, pos);
        pos += 16;
        this.AgentData['SessionID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeUInt32LE(this.ObjectData['LocalID'], pos);
        pos += 4;
        const count = this.SurfaceInfo.length;
        buf.writeUInt8(this.SurfaceInfo.length, pos++);
        for (let i = 0; i < count; i++)
        {
            this.SurfaceInfo[i]['UVCoord'].writeToBuffer(buf, pos, false);
            pos += 12;
            this.SurfaceInfo[i]['STCoord'].writeToBuffer(buf, pos, false);
            pos += 12;
            buf.writeInt32LE(this.SurfaceInfo[i]['FaceIndex'], pos);
            pos += 4;
            this.SurfaceInfo[i]['Position'].writeToBuffer(buf, pos, false);
            pos += 12;
            this.SurfaceInfo[i]['Normal'].writeToBuffer(buf, pos, false);
            pos += 12;
            this.SurfaceInfo[i]['Binormal'].writeToBuffer(buf, pos, false);
            pos += 12;
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
        const newObjObjectData: {
            LocalID: number
        } = {
            LocalID: 0
        };
        newObjObjectData['LocalID'] = buf.readUInt32LE(pos);
        pos += 4;
        this.ObjectData = newObjObjectData;
        const count = buf.readUInt8(pos++);
        this.SurfaceInfo = [];
        for (let i = 0; i < count; i++)
        {
            const newObjSurfaceInfo: {
                UVCoord: Vector3,
                STCoord: Vector3,
                FaceIndex: number,
                Position: Vector3,
                Normal: Vector3,
                Binormal: Vector3
            } = {
                UVCoord: Vector3.getZero(),
                STCoord: Vector3.getZero(),
                FaceIndex: 0,
                Position: Vector3.getZero(),
                Normal: Vector3.getZero(),
                Binormal: Vector3.getZero()
            };
            newObjSurfaceInfo['UVCoord'] = new Vector3(buf, pos, false);
            pos += 12;
            newObjSurfaceInfo['STCoord'] = new Vector3(buf, pos, false);
            pos += 12;
            newObjSurfaceInfo['FaceIndex'] = buf.readInt32LE(pos);
            pos += 4;
            newObjSurfaceInfo['Position'] = new Vector3(buf, pos, false);
            pos += 12;
            newObjSurfaceInfo['Normal'] = new Vector3(buf, pos, false);
            pos += 12;
            newObjSurfaceInfo['Binormal'] = new Vector3(buf, pos, false);
            pos += 12;
            this.SurfaceInfo.push(newObjSurfaceInfo);
        }
        return pos - startPos;
    }
}

