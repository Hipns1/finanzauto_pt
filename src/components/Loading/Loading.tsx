import React from 'react'
import s from './Loading.module.scss'
import loading_gif from '../../assets/loading_gif.gif'
import logo from '../../assets/finanzauto_logo.png'

const Loading = () => {
    return (
        <div className={s.container}>
            <img alt='loading' src={logo} className={s.logo} />
            <img alt='loading' src={loading_gif} className={s.loading} />
        </div>
    )
}

export default Loading
