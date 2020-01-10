import React, { useRef } from 'react';
import { useSelector } from 'react-redux';

import { copyText, getUrlFromEnv } from 'utils';
import { hasAccessSelector } from 'selectors/auth';
import { Permission } from 'utils/enums';

import PageWrap from 'components/wrappers/PageWrap';
import Header from 'components/header';
import PageContentWrap from 'components/wrappers/PageContentWrap';
import ChangePassword from 'components/widgets/settings/ChangePassword';
import PluginSettingsForm from 'components/widgets/settings/PluginSettingsForm';
import SettingsBlockWrap from 'components/widgets/settings/SettingsBlockWrap';
import UserInfo from 'components/widgets/settings/UserInfo';

const Settings = () => {
  const iFrameRef = useRef();

  const pluginAccess = useSelector(hasAccessSelector(Permission.PLUGIN_SETTINGS));
  const pluginClientAccess = useSelector(hasAccessSelector(Permission.PLUGIN_SETTINGS_CLIENT));

  return (
    <PageWrap>
      <Header/>
      <PageContentWrap title="Настройки">
        <div className="block">
          {(!pluginAccess && pluginClientAccess)
            ? null
            : <SettingsBlockWrap title="Логин и email пользователя">
              <div className="col-12">
                <p>Здесь отображается ваш логин и email</p>
              </div>
              <UserInfo/>
            </SettingsBlockWrap>}
          <SettingsBlockWrap title="Смена пароля">
            <div className="col-12">
              <p>Изменение пароля для входа - это простой способ обеспечить безопасность вашего
                аккаунта</p>
            </div>
            <ChangePassword/>
          </SettingsBlockWrap>
          {(!pluginAccess && pluginClientAccess)
            ? null
            : <SettingsBlockWrap title="Установка плагина">
              <div className="col-lg-12">
                <p>Это код вашего виджета. Скопируйте и вставьте его код тех страниц, на
                  которых вы хотите принимать обращения посетителей. Необходимо самостоятельно
                  заполнить параметры: <code className="inner-code">label</code>,
                  <code className="inner-code">currency_code</code> и
                  <code className="inner-code">lang</code>
                </p>
                <div className="form-group">
                  <button type="button"
                          className="btn btn-alt-primary"
                          onClick={() => copyText(iFrameRef)}
                  >
                    Copy
                  </button>
                </div>
                <code className="js-style" ref={iFrameRef}>
                  &lt;iframe
                  id="kassma-plugin-frame"
                  src="{getUrlFromEnv(process.env.REACT_APP_PAYMENT_URL)}?label=
                  <span className="inner-code">label</span>
                  &currency_code=
                  <span className="inner-code">currency_code</span>
                  &lang=
                  <span className="inner-code">lang</span>"
                  width="640" height="750" frameBorder="0"&gt;&lt;/iframe&gt;
                  <br/>
                  &lt;script&gt;document.querySelector('#kassma-plugin-frame').src += '&' + new
                  Date().getTime();&lt;/script&gt;
                </code>
              </div>
            </SettingsBlockWrap>}
          <SettingsBlockWrap title="Настройка плагина">
            <PluginSettingsForm/>
          </SettingsBlockWrap>
        </div>
      </PageContentWrap>
    </PageWrap>
  );
};

export default Settings;
