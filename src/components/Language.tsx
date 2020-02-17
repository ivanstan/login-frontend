import React from 'react'
import { translate } from 'react-polyglot'
import { locale } from '../services/LocaleStore';

class Language extends React.Component<any, any> {
  static onChange(current: string) {
    locale.current = current;
    window.localStorage.setItem('locale', current);
  }

  render(): any {
    const { t } = this.props;

    return (
      <div className="ml-auto">
        {/*<ul className="nav">*/}
        {/*  <li className="nav-item">*/}
        {/*    <a*/}
        {/*      active={locale.current === 'en'}*/}
        {/*      onClick={() => Language.onChange('en')}*/}
        {/*    >*/}
        {/*      {t('English')}*/}
        {/*    </a>*/}
        {/*  </li>*/}
        {/*  <li className="nav-item">*/}
        {/*    <a*/}
        {/*      active={locale.current === 'sr'}*/}
        {/*      onClick={() => Language.onChange('sr')}*/}
        {/*    >*/}
        {/*      {t('Serbian')}*/}
        {/*    </a>*/}
        {/*  </li>*/}
        {/*</ul>*/}
      </div>
    );
  }
}

export default translate()(Language)
