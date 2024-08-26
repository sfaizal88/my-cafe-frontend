/**
 * Constant
 * @author - Faizal 
 * @date - 23rd August 2024
 */
// UTILS
import {GenderEnum} from './enum';
import type {SelectOptionsType} from './types';

// GENDER FOR SELECT TAG
export const GenderOptions: SelectOptionsType[] = [
    {value: GenderEnum.MALE, label: 'Male'},
    {value: GenderEnum.FEMALE, label: 'Female'}
]