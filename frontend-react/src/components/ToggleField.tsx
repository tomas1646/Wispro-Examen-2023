import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import React from 'react';
import { SubTitle } from './Title';

interface Props {
  title?: string;
  value: string;
  setValue: (e: any) => void;
}

export default function ToggleField(props: Props) {
  return (
    <>
      {props.title && <SubTitle text={props.title} />}
      <ToggleButtonGroup
        color='primary'
        value={props.value}
        exclusive
        onChange={(e, data) => props.setValue(data)}
        fullWidth
      >
        <ToggleButton value='Client'>Client</ToggleButton>
        <ToggleButton value='Isp'>ISP</ToggleButton>
      </ToggleButtonGroup>
    </>
  );
}
