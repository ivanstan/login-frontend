import React from 'react'
import { translate } from 'react-polyglot'
import styled from 'styled-components'
import { store } from '../services/stores/Store'

const Item: any = styled.a`
  cursor: pointer;
  color: ${(props: any) => props.active ? 'rgba(0, 0, 0)' : 'rgba(0, 0, 0, 0.5)'};

  padding-right: 0.5rem;
  padding-left: 0.5rem;

  &:hover {
    color: rgba(0, 0, 0);
    text-decoration: none;
  }
`

class Language extends React.Component<any, any> {
  static onChange(locale: string) {
    store.locale = locale
    window.localStorage.setItem('locale', locale)
  }

  render(): any {
    const { t } = this.props

    return (
      <div className="ml-auto">
        <ul className="nav">
          <li className="nav-item">
            <Item
              active={store.locale === 'en'}
              onClick={() => Language.onChange('en')}
            >
              {t('English')}
            </Item>
          </li>
          <li className="nav-item">
            <Item
              active={store.locale === 'sr'}
              onClick={() => Language.onChange('sr')}
            >
              {t('Serbian')}
            </Item>
          </li>
        </ul>
      </div>
    )
  }
}

export default translate()(Language)
