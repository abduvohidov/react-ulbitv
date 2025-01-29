import React, { FC, memo, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input';
import { useDispatch, useSelector } from 'react-redux';
import { getLoginState } from 'features/AuthByUsername/model/selectors/getLoginState/getLoginState';
import { loginByUsernane } from 'features/AuthByUsername/model/services/loginByUsername';
import { loginActions } from '../../model/slice/LoginSlice';

import cls from './LoginForm.module.scss';

interface LoginFormProps {
    className?: string;
}

export const LoginForm: FC<LoginFormProps> = memo((props: LoginFormProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const {
        username,
        password,
        error,
        isLoading,
    } = useSelector(getLoginState);

    const onChangeUsername = useCallback((value: string) => {
        dispatch(loginActions.setUsername(value));
    }, [dispatch]);

    const onChangePassword = useCallback((value: string) => {
        dispatch(loginActions.setPassword(value));
    }, [dispatch]);

    const onLoginClick = useCallback(() => {
        dispatch(loginByUsernane({ username, password }));
    }, [dispatch, username, password]);

    return (
        <form onSubmit={onLoginClick} className={classNames(cls.LoginForm, {}, [className])}>
            <h2 className={classNames(cls.LoginFormTitle)}>{t('Авторизация')}</h2>
            {error && <div>{error}</div>}
            <Input
                autoFocus
                type="text"
                placeholder={t('Введите логин')}
                className={classNames(cls.LoginFormInput)}
                onChange={onChangeUsername}
                value={username}
            />
            <Input
                autoFocus
                type="text"
                placeholder={t('Введите пароль')}
                className={classNames(cls.LoginFormInput)}
                onChange={onChangePassword}
                value={password}
            />
            <Button
                disabled={isLoading}
                type="submit"
                className={classNames(cls.LoginFormButton)}
            >
                {t('Войти')}
            </Button>
        </form>
    );
});
