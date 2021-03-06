// This file has been automatically generated by writeMessageClasses.js

import { UUID } from '../UUID';
import { MessageFlags } from '../../enums/MessageFlags';
import { MessageBase } from '../MessageBase';
import { Message } from '../../enums/Message';

export class PickDeleteMessage implements MessageBase
{
    name = 'PickDelete';
    messageFlags = MessageFlags.FrequencyLow;
    id = Message.PickDelete;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    Data: {
        PickID: UUID;
    };

    getSize(): number
    {
        return 48;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        this.AgentData['AgentID'].writeToBuffer(buf, pos);
        pos += 16;
        this.AgentData['SessionID'].writeToBuffer(buf, pos);
        pos += 16;
        this.Data['PickID'].writeToBuffer(buf, pos);
        pos += 16;
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
        const newObjData: {
            PickID: UUID
        } = {
            PickID: UUID.zero()
        };
        newObjData['PickID'] = new UUID(buf, pos);
        pos += 16;
        this.Data = newObjData;
        return pos - startPos;
    }
}

