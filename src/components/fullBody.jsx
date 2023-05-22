import { useState, useRef } from 'react'
import meuLogo from '../assets/Logo.png'
import alertImg from '../assets/Alert.png'
import noText from '../assets/noText-img.svg'
import './fullBody.css'

export const FullBody = () => {

  const [textoCriptografado, setTextoCriptografado] = useState('')
  const [mostrarTexto, setMostrarTexto] = useState(false)
  const spanRef = useRef(null)

  const CriptografarTexto = () => {
    const textoOriginal = document.querySelector('textarea').value
    
    if (textoOriginal === "") {
      setMostrarTexto(false)
      return
    }

    const textCript = []

    for (let i = 0; i < textoOriginal.length; i++) {
      if(textoOriginal[i] == 'a'){
        textCript.push('ai')
      }else if (textoOriginal[i] == 'e'){
        textCript.push('enter')
      }else if (textoOriginal[i] == 'i'){
        textCript.push('imes')
      }else if (textoOriginal[i] == 'o'){
        textCript.push('ober')
      }else if (textoOriginal[i] == 'u'){
        textCript.push('ufat')
      }else{
        textCript.push(textoOriginal[i])
      }
    }

    const textoCriptografado = textCript.join('')
    setTextoCriptografado(textoCriptografado)
    setMostrarTexto(true)
  }

  const DescriptografarTexto = () => {
    const textoDecript = document.querySelector('textarea').value

    if (textoDecript === "") {
      setMostrarTexto(false)
      return
    }

    const decriptText = textoDecript
    .replaceAll('ai', 'a')
    .replaceAll('enter', 'e')
    .replaceAll('imes', 'i')
    .replaceAll('ober', 'o')
    .replaceAll('ufat', 'u')

    console.log(decriptText)
    setTextoCriptografado(decriptText)
    setMostrarTexto(true)
  }

  const copiarTexto = () => {
    const texto = spanRef.current.innerText
    navigator.clipboard.writeText(texto)
      .then(() => {
        console.log('Texto copiado com sucesso!')
      })
      .catch((error) => {
        console.error('Erro ao copiar o texto:', error)
      })
  }

  return (
    <div className="main">
        <div className="container">
            <div className="logo">
                <img src={meuLogo} alt="meu-logo" />
            </div>
            <div className="text_input">
                <textarea placeholder='Digite seu texto ...' rows={10} required />
                <div className="alert_container">
                  <img src={alertImg} alt="alerto-icon" />
                  <p>Apenas letras minúsculas e sem acento.</p>
                </div>
                <div className="btn_container">
                  <input className='btn_01' type="button" value="Criptografar" onClick={CriptografarTexto} />
                  <input className='btn_02' type="button" value="Descriptografar" onClick={DescriptografarTexto} />
                </div>
            </div>
            <div className="section2_container">
            {mostrarTexto ? (
                <div className="text_container">
                  <div className="text_scroll">
                    <span ref={spanRef} >{textoCriptografado}</span>
                  </div>
                  <div className="btn_container">
                    <input className='btn_copy' type="button" value="Copiar" onClick={copiarTexto} />
                  </div>
                </div>
              ) : (
                  <div className="noText_container">
                    <img src={noText} alt="noText-img" />
                    <h1>Nenhuma mensagem encontrada</h1>
                    <p>
                      Digite um texto que você deseja<br />
                      criptografar ou descriptografar.
                    </p>
                  </div>
                )}
            </div>
        </div>
        <div className="clear"></div>
    </div>
  )
}
