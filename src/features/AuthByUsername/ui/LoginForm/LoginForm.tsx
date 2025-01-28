import React, { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input';

import cls from './LoginForm.module.scss';

interface LoginFormProps {
    className?: string;
}

export const LoginForm: FC<LoginFormProps> = (props: LoginFormProps) => {
    const { className } = props;
    const { t } = useTranslation();

    return (
        <form className={classNames(cls.LoginForm, {}, [className])}>
            <h2 className={classNames(cls.LoginFormTitle)}>{t('Авторизация')}</h2>
            <Input
                autoFocus
                type="text"
                placeholder={t('Введите логин')}
                className={classNames(cls.LoginFormInput)}
            />
            <Input
                autoFocus
                type="text"
                placeholder={t('Введите пароль')}
                className={classNames(cls.LoginFormInput)}
            />
            <Button className={classNames(cls.LoginFormButton)}>
                {t('Войти')}
            </Button>
        </form>
    );
};
