import { ChangeEvent, useState } from 'react'

import avatar from '../../../assets/icon/avatar.png'
import edit from '../../../assets/icon/edit.svg'
import logoutImg from '../../../assets/icon/log.out.svg'
import { Button, Card, TextField, Typography } from '../../ui'

import s from './personal.information.module.scss'

import {
  useLogoutMutation,
  useMeQuery,
  useUpdateProfileMutation,
} from '@/services/auth/auth.service'

export const PersonalInformation = () => {
  const { data } = useMeQuery()
  const [logout] = useLogoutMutation()
  const [updateProfile] = useUpdateProfileMutation()
  const [editName, setEditName] = useState<boolean>(false)
  const [nickName, setNickName] = useState<string | undefined>(data?.name)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNickName(e.currentTarget.value)
  }

  const saveNewNickName = () => {
    const formData = new FormData()

    if (nickName) formData.append('name', nickName)

    updateProfile(formData)
      .then(() => {
        setEditName(false)
      })
      .catch((error: Error) => {
        console.error(error)
      })
  }

  return (
    <div className={s.main}>
      <Card className={s.card}>
        <Typography variant={'large'} className={s.title}>
          Personal Information
        </Typography>
        {editName ? (
          <div className={s.editMode}>
            <img className={s.imageEditMode} src={avatar} alt={'edit'} />
            <TextField
              placeholder={'Nickname'}
              label={'Nickname'}
              name={'Nickname'}
              value={nickName}
              onChange={onChangeHandler}
            />
            <Button fullWidth onClick={saveNewNickName}>
              Save Changes
            </Button>
          </div>
        ) : (
          <>
            <div className={s.avatar}>
              <Button variant={'secondary'} className={s.editAvatar}>
                <img src={edit} alt={'edit'} />
              </Button>
            </div>
            <div className={s.name}>
              <Typography variant={'h1'}>{data?.name}</Typography>
              <Button onClick={() => setEditName(true)} variant={'link'} className={s.editName}>
                <img src={edit} alt={'edit'} />
              </Button>
            </div>
            <Typography variant={'body2'} className={s.email}>
              {data?.email}
            </Typography>
            <Button onClick={() => logout()} variant={'secondary'} className={s.logout}>
              <img src={logoutImg} alt="logout" /> Log Out
            </Button>
          </>
        )}
      </Card>
    </div>
  )
}
