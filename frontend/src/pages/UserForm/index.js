import React, { useState, useEffect } from 'react'
import { Form, Input, Scope } from 'unform'
import * as Yup from 'yup'
import api from '../../services/api'

const schema = Yup.object().shape({
    name: Yup.string().required('Nome obrigatório')
})

export default function UserForm({ history, match }) {
    const [data, setData] = useState({})

    async function handleSubmit(data) {
        console.log(data)
        // await api.post('/users', data)
        await api.postOrPut('/users', match.params.id, data)

        history.push('/users')
    }   

    useEffect(() => {
        async function loadData() {
            console.log(data)
            const { id } = match.params
            const response = await api.get(`/users/${id}`)

            setData(response.data)
        }
        // só é executado se o match.params.id existir, 
        // ou seja na criação não irá executar, apenas edição
        if (match.params.id) {
            loadData()
        }
    }, [match.params, match.params.id])

    return (
        <Form onSubmit={handleSubmit} initialData={data} schema={schema}>
            <Input name="name" label="Nome" />
            <Input name="email" label="E-mail" />
            
            <Scope path="address">
                <Input name="street" label="Rua" />
                <Input name="number" label="número" />
            </Scope>
            
            <button type="submit">Enviar</button>
        </Form>
    )
}