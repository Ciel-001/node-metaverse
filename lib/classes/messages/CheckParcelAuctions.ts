// This file has been automatically generated by writeMessageClasses.js

import Long = require('long');
import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class CheckParcelAuctionsMessage implements MessageBase
{
    name = 'CheckParcelAuctions';
    messageFlags = MessageFlags.Trusted | MessageFlags.FrequencyLow;
    id = Message.CheckParcelAuctions;

    RegionData: {
        RegionHandle: Long;
    }[];

    getSize(): number
    {
        return ((8) * this.RegionData.length) + 1;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        const count = this.RegionData.length;
        buf.writeUInt8(this.RegionData.length, pos++);
        for (let i = 0; i < count; i++)
        {
            buf.writeInt32LE(this.RegionData[i]['RegionHandle'].low, pos);
            pos += 4;
            buf.writeInt32LE(this.RegionData[i]['RegionHandle'].high, pos);
            pos += 4;
        }
        return pos - startPos;
    }

    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let varLength = 0;
        const count = buf.readUInt8(pos++);
        this.RegionData = [];
        for (let i = 0; i < count; i++)
        {
            const newObjRegionData: {
                RegionHandle: Long
            } = {
                RegionHandle: Long.ZERO
            };
            newObjRegionData['RegionHandle'] = new Long(buf.readInt32LE(pos), buf.readInt32LE(pos+4));
            pos += 8;
            this.RegionData.push(newObjRegionData);
        }
        return pos - startPos;
    }
}

