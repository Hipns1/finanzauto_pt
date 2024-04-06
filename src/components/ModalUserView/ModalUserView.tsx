import React from 'react'
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap'
import s from './ModalUserView.module.scss'
import { ModalUserProps } from 'models/data/ModalUserProps'

const ModalUserView: React.FC<ModalUserProps> = ({ isOpen, setIsOpen, userEdit, setUserEdit }) => {
    return (
        <div>
            <Modal isOpen={isOpen}>
                <ModalHeader>
                    <div>{'Detalles del usuario'}</div>
                    <Button
                        color='danger'
                        onClick={() => {
                            setIsOpen(!isOpen)
                            setUserEdit(null)
                        }}
                        className={s.btn}>
                        X
                    </Button>
                </ModalHeader>
                <ModalBody>
                    {userEdit && (
                        <div className={s.container}>
                            <img src={userEdit.picture} alt='User' className={s.img} />
                            <p>
                                <strong>Titulo:</strong> {userEdit.title}
                            </p>
                            <p>
                                <strong>Nombre:</strong> {userEdit.firstName}
                            </p>
                            <p>
                                <strong>Apellido:</strong> {userEdit.lastName}
                            </p>
                            <p>
                                <strong>Email:</strong> {userEdit.email}
                            </p>
                            <p>
                                <strong>Genero:</strong> {userEdit.gender}
                            </p>
                            <p>
                                <strong>Telefono:</strong> {userEdit.phone}
                            </p>
                        </div>
                    )}
                </ModalBody>
            </Modal>
        </div>
    )
}

export default ModalUserView
