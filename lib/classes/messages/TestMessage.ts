// This file has been automatically generated by writeMessageClasses.js

import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class TestMessageMessage implements MessageBase
{
    name = 'TestMessage';
    messageFlags = MessageFlags.Zerocoded | MessageFlags.FrequencyLow;
    id = Message.TestMessage;

    TestBlock1: {
        Test1: number;
    };
    NeighborBlock: {
        Test0: number;
        Test1: number;
        Test2: number;
    }[];

    getSize(): number
    {
        return 52;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        buf.writeUInt32LE(this.TestBlock1['Test1'], pos);
        pos += 4;
        const count = 4;
        for (let i = 0; i < count; i++)
        {
            buf.writeUInt32LE(this.NeighborBlock[i]['Test0'], pos);
            pos += 4;
            buf.writeUInt32LE(this.NeighborBlock[i]['Test1'], pos);
            pos += 4;
            buf.writeUInt32LE(this.NeighborBlock[i]['Test2'], pos);
            pos += 4;
        }
        return pos - startPos;
    }

    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let varLength = 0;
        const newObjTestBlock1: {
            Test1: number
        } = {
            Test1: 0
        };
        newObjTestBlock1['Test1'] = buf.readUInt32LE(pos);
        pos += 4;
        this.TestBlock1 = newObjTestBlock1;
        const count = 4;
        this.NeighborBlock = [];        for (let i = 0; i < count; i++)
        {
            const newObjNeighborBlock: {
                Test0: number,
                Test1: number,
                Test2: number
            } = {
                Test0: 0,
                Test1: 0,
                Test2: 0
            };
            newObjNeighborBlock['Test0'] = buf.readUInt32LE(pos);
            pos += 4;
            newObjNeighborBlock['Test1'] = buf.readUInt32LE(pos);
            pos += 4;
            newObjNeighborBlock['Test2'] = buf.readUInt32LE(pos);
            pos += 4;
            this.NeighborBlock.push(newObjNeighborBlock);
        }
        return pos - startPos;
    }
}

