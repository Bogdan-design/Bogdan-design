import edit from '../../../assets/icon/edit.svg'
import logout from '../../../assets/icon/log.out.svg'
import { Button, Card, Typography } from '../../ui'

import s from './personal.information.module.scss'

export const PersonalInformation = () => {
  return (
    <div className={s.main}>
      <Card className={s.card}>
        <Typography variant={'large'} className={s.title}>
          Personal Information
        </Typography>
        <div className={s.avatar}>
          <Button variant={'secondary'} className={s.editAvatar}>
            <img src={edit} alt={'edit'} />
          </Button>
        </div>
        <Typography variant={'h1'} className={s.name}>
          Ivan
          <Button variant={'link'} className={s.editName}>
            <img src={edit} alt={'edit'} />
          </Button>
        </Typography>
        <Typography variant={'body2'} className={s.email}>
          email@gmail.com
        </Typography>
        <Button variant={'secondary'} className={s.logout}>
          <img src={logout} alt="logout" />
          Logout
        </Button>
      </Card>
    </div>
  )
}
