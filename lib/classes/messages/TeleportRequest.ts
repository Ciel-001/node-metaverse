// This file has been automatically generated by writeMessageClasses.js

import {UUID} from '../UUID';
import {Vector3} from '../Vector3';
import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class TeleportRequestMessage implements MessageBase
{
    name = 'TeleportRequest';
    messageFlags = MessageFlags.FrequencyLow;
    id = Message.TeleportRequest;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    Info: {
        RegionID: UUID;
        Position: Vector3;
        LookAt: Vector3;
    };

    getSize(): number
    {
        return 72;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        this.AgentData['AgentID'].writeToBuffer(buf, pos);
        pos += 16;
        this.AgentData['SessionID'].writeToBuffer(buf, pos);
        pos += 16;
        this.Info['RegionID'].writeToBuffer(buf, pos);
        pos += 16;
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
        const newObjInfo: {
            RegionID: UUID,
            Position: Vector3,
            LookAt: Vector3
        } = {
            RegionID: UUID.zero(),
            Position: Vector3.getZero(),
            LookAt: Vector3.getZero()
        };
        newObjInfo['RegionID'] = new UUID(buf, pos);
        pos += 16;
        newObjInfo['Position'] = new Vector3(buf, pos, false);
        pos += 12;
        newObjInfo['LookAt'] = new Vector3(buf, pos, false);
        pos += 12;
        this.Info = newObjInfo;
        return pos - startPos;
    }
}

