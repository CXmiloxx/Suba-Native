import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { post } from '../../api/httpService';

export default function Registro() {
    const [valores, setValores] = useState({
        nombres: '',
        apellidos: '',
        correo: '',
        contraseña: '',
        telefono: '',
        saldo: '0',
        repetirContraseña: '',
    });
    const [cargando, setCargando] = useState(false);

    const [validaciones, setValidaciones] = useState({
        nombresValido: false,
        apellidosValido: false,
        correoValido: false,
        telefonoValido: false,
        contraseñaValida: false,
        repetirContraseñaValida: false,
    });

    const validarCorreo = (email) =>
        /^[\w.-]+@[a-zA-Z]+\.[a-zA-Z]{2,7}$/.test(email);
    const validarContraseña = (password) =>
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password);

    const handleChange = (name, value) => {
        setValores({ ...valores, [name]: value });

        switch (name) {
        case 'nombres':
            setValidaciones((prev) => ({
            ...prev,
            nombresValido: value.length >= 3,
            }));
            break;
        case 'apellidos':
            setValidaciones((prev) => ({
            ...prev,
            apellidosValido: value.length >= 3,
            }));
            break;
        case 'correo':
            setValidaciones((prev) => ({
            ...prev,
            correoValido: validarCorreo(value),
            }));
            break;
        case 'telefono':
            setValidaciones((prev) => ({
            ...prev,
            telefonoValido: /^[0-9]{10}$/.test(value),
            }));
            break;
        case 'contraseña':
            setValidaciones((prev) => ({
            ...prev,
            contraseñaValida: validarContraseña(value),
            }));
            break;
        case 'repetirContraseña':
            setValidaciones((prev) => ({
            ...prev,
            repetirContraseñaValida: value === valores.contraseña,
            }));
            break;
        default:
            break;
        }
    };

    const handleSubmit = async () => {
        const validations = [
        {
            campo: 'nombres',
            min: 3,
            message: 'El nombre debe contener mínimo 3 caracteres',
        },
        {
            campo: 'apellidos',
            min: 3,
            message: 'El apellido debe contener mínimo 3 caracteres',
        },
        {
            campo: 'correo',
            validacion: validarCorreo,
            message: 'Debe introducir una dirección de correo electrónico válida',
        },
        {
            campo: 'telefono',
            min: 10,
            max: 10,
            message: 'El teléfono debe ser de 10 números',
        },
        {
            campo: 'contraseña',
            validacion: validarContraseña,
            message: 'La contraseña no cumple con los requisitos mínimos',
        },
        {
            campo: 'repetirContraseña',
            validacion: (value) => value === valores.contraseña,
            message: 'Las contraseñas no coinciden',
        },
        ];

        for (const { campo, min, max, validacion, message } of validations) {
        const value = valores[campo];
        if (
            (min && value.length < min) ||
            (max && value.length > max) ||
            (validacion && !validacion(value))
        ) {
            Alert.alert('Error', message);
            return;
        }
        }

        await post('usuario/Insertar', {
        nombres: valores.nombres,
        apellidos: valores.apellidos,
        correo: valores.correo,
        contraseña: valores.contraseña,
        telefono: valores.telefono,
        saldo: valores.saldo,
        })
        .then((data) => {
            console.log(data);
            if (data.status) {
            Alert.alert(
                'Registro exitoso',
                'El usuario ha sido registrado correctamente',
            );
            setValores({
                nombres: '',
                apellidos: '',
                correo: '',
                contraseña: '',
                telefono: '',
                saldo: '',
                repetirContraseña: '',
            });
            } else {
            Alert.alert('Error', 'No se pudo registrar el usuario');
            }
        })
        .catch((err) => {
            Alert.alert('Error', err);
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Registro</Text>

            <View style={styles.formContainer}>
                <TextInput
                    style={[styles.input, validaciones.nombresValido && styles.inputValid]}
                    placeholder="Nombres"
                    value={valores.nombres}
                    onChangeText={(text) => handleChange('nombres', text)}
                />
                <Text style={validaciones.nombresValido ? styles.valid : styles.invalid}>
                    {validaciones.nombresValido ? 'Válido' : '3+ caracteres'}
                </Text>

                <TextInput
                    style={[styles.input, validaciones.apellidosValido && styles.inputValid]}
                    placeholder="Apellidos"
                    value={valores.apellidos}
                    onChangeText={(text) => handleChange('apellidos', text)}
                />
                <Text style={validaciones.apellidosValido ? styles.valid : styles.invalid}>
                    {validaciones.apellidosValido ? 'Válido' : '3+ caracteres'}
                </Text>

                <TextInput
                    style={[styles.input, validaciones.telefonoValido && styles.inputValid]}
                    placeholder="Teléfono"
                    value={valores.telefono}
                    keyboardType="phone-pad"
                    onChangeText={(text) => handleChange('telefono', text)}
                />
                <Text style={validaciones.telefonoValido ? styles.valid : styles.invalid}>
                    {validaciones.telefonoValido ? 'Válido' : '10 dígitos'}
                </Text>

                <TextInput
                    style={[styles.input, validaciones.correoValido && styles.inputValid]}
                    placeholder="Correo Electrónico"
                    value={valores.correo}
                    keyboardType="email-address"
                    onChangeText={(text) => handleChange('correo', text)}
                />
                <Text style={validaciones.correoValido ? styles.valid : styles.invalid}>
                    {validaciones.correoValido ? 'Válido' : 'Email válido'}
                </Text>

                <TextInput
                    style={[styles.input, validaciones.contraseñaValida && styles.inputValid]}
                    placeholder="Contraseña"
                    secureTextEntry
                    value={valores.contraseña}
                    onChangeText={(text) => handleChange('contraseña', text)}
                />
                <Text style={validaciones.contraseñaValida ? styles.valid : styles.invalid}>
                    {validaciones.contraseñaValida
                        ? 'Válido'
                        : '6+ caracteres, 1 letra, 1 número'}
                </Text>

                <TextInput
                    style={[styles.input, validaciones.repetirContraseñaValida && styles.inputValid]}
                    placeholder="Confirmar Contraseña"
                    secureTextEntry
                    value={valores.repetirContraseña}
                    onChangeText={(text) => handleChange('repetirContraseña', text)}
                />
                <Text style={validaciones.repetirContraseñaValida ? styles.valid : styles.invalid}>
                    {validaciones.repetirContraseñaValida ? 'Coincide' : 'No coincide'}
                </Text>

                <TouchableOpacity
                    style={[styles.button, cargando && styles.buttonDisabled]}
                    onPress={handleSubmit}
                    disabled={cargando}
                >
                    <Text style={styles.buttonText}>{cargando ? 'Registrando...' : 'Registrar'}</Text>
                </TouchableOpacity>

                <Text style={styles.loginText}>¿Ya tienes una cuenta? Inicia sesión</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    titulo: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#4C6A92',
    },
    formContainer: {
        width: '100%',
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 10,
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    inputValid: {
        borderColor: 'green',
    },
    button: {
        backgroundColor: '#4C6A92',
        paddingVertical: 12,
        borderRadius: 8,
        marginTop: 20,
    },
    buttonDisabled: {
        backgroundColor: '#ccc',
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 18,
    },
    loginText: {
        textAlign: 'center',
        marginTop: 10,
        fontSize: 16,
        color: '#4C6A92',
    },
    valid: {
        color: 'green',
        fontSize: 12,
        marginBottom: 5,
    },
    invalid: {
        color: 'red',
        fontSize: 12,
        marginBottom: 5,
    },
});
