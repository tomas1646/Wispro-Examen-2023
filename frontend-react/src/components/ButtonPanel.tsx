import { Button } from '@mui/material';
import React from 'react';

interface ButtonProps {
  onClick?: (e?: any) => void;
  submit?: boolean;
  text: string;
  style?: React.CSSProperties;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

interface Props {
  button: ButtonProps[];
}

export function ButtonPanel(props: Props) {
  return (
    <div
      style={{
        display: 'flex',
        marginTop: '10px',
        justifyContent: 'flex-end',
        gap: '7px',
      }}
    >
      {props.button.map((button, index) => (
        <DefaultButton
          key={button.text + index}
          onClick={button.onClick}
          text={button.text}
          style={button.style}
          submit={button.submit}
        />
      ))}
    </div>
  );
}

export function DefaultButton(props: ButtonProps) {
  return (
    <Button
      type={props.submit ? 'submit' : 'button'}
      variant='contained'
      onClick={props.onClick}
      style={props.style}
      startIcon={props.startIcon}
      endIcon={props.endIcon}
    >
      {props.text}
    </Button>
  );
}
