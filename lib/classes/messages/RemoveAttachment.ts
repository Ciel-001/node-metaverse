// This file has been automatically generated by writeMessageClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class RemoveAttachmentMessage implements MessageBase
{
    name = 'RemoveAttachment';
    messageFlags = MessageFlags.FrequencyLow;
    id = Message.RemoveAttachment;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    AttachmentBlock: {
        AttachmentPoint: number;
        ItemID: UUID;
    };

    getSize(): number
    {
        return 49;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        this.AgentData['AgentID'].writeToBuffer(buf, pos);
        pos += 16;
        this.AgentData['SessionID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeUInt8(this.AttachmentBlock['AttachmentPoint'], pos++);
        this.AttachmentBlock['ItemID'].writeToBuffer(buf, pos);
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
        const newObjAttachmentBlock: {
            AttachmentPoint: number,
            ItemID: UUID
        } = {
            AttachmentPoint: 0,
            ItemID: UUID.zero()
        };
        newObjAttachmentBlock['AttachmentPoint'] = buf.readUInt8(pos++);
        newObjAttachmentBlock['ItemID'] = new UUID(buf, pos);
        pos += 16;
        this.AttachmentBlock = newObjAttachmentBlock;
        return pos - startPos;
    }
}

