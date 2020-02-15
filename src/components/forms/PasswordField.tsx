import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import {Visibility, VisibilityOff} from '@material-ui/icons';
import _ from 'lodash';
import {FormHelperText} from "@material-ui/core";

interface PasswordFieldPropsInterface {
  onChange: Function,
  onKeyPress?: Function,
  value: string,
  variant?: 'standard' | 'outlined' | 'filled';
  required?: boolean,
  fullWidth?: boolean,
  label: string,
  className?: string,
  ref?: any,
  error?: boolean,
  helperText?: string,
}

export class PasswordField extends React.Component<PasswordFieldPropsInterface, any> {

  readonly state: any = {
    value: '',
    show: false,
  };

  componentDidMount(): void {
    this.setState({
      value: this.props.value
    });
  }

  handleClickShowPassword = () => {
    this.setState({show: !this.state.show});
  };

  onChange(e: any) {
    this.setState({value: e.target.value});

    this.props.onChange(e);
  }

  render() {
    const {value, show} = this.state;
    const {className, variant, label, fullWidth, required, onKeyPress} = this.props;

    return (
      <FormControl fullWidth={fullWidth} required={required} variant={variant} className={className}>
        <InputLabel htmlFor="standard-adornment-password" variant={variant}>
          {label}
        </InputLabel>
        <OutlinedInput
          {..._.pick(this.props, ['ref', 'onKeyPress'])}
          endAdornment={(
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={this.handleClickShowPassword}
                onMouseDown={e => e.preventDefault()}
              >
                {show ? <Visibility/> : <VisibilityOff/>}
              </IconButton>
            </InputAdornment>
          )}
          id="standard-adornment-password"
          labelWidth={0}
          onChange={e => this.onChange(e)}
          type={show ? 'text' : 'password'}
          value={value}
        />
        <FormHelperText {..._.pick(this.props, ['error'])}>
          {this.props.helperText || ' '}
        </FormHelperText>
      </FormControl>
    );
  }
}
