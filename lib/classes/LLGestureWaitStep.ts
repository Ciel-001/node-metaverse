import { LLGestureStep } from './LLGestureStep';
import { LLGestureStepType } from '../enums/LLGestureStepType';
import { UUID } from './UUID';
import { LLGestureWaitFlags } from '../enums/LLGestureWaitFlags';

export class LLGestureWaitStep extends LLGestureStep
{
    stepType: LLGestureStepType = LLGestureStepType.Wait;
    waitTime: number;
    flags: LLGestureWaitFlags = LLGestureWaitFlags.None;
}
