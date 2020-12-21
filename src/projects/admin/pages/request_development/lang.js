import React from 'react';

const getWhatsappMessage = user => ({
  es:
    `Hola ${user.name}, gracias por utilizar nuestros servicios!` +
    ' Vamos a brindarte la mejor atención posible.',
  en: `Hey ${user.name}, thanks for using our services! we will give you the best possible attention.`
});
const whatsappLink = (user, language_code) =>
  `https://api.whatsapp.com/send?phone=5491130696440&text=${encodeURIComponent(
    getWhatsappMessage(user)[language_code]
  )}`;

export const getLanguage = language_code =>
  ({
    es: {
      developmentRequest: 'Pedido de desarrollo web',
      message: user =>
        `${user.name}, a continuación te vamos` +
        ' a mostrar todas las características que ofrecemos al día de hoy.' +
        ' Algunas de ellas se pagan mensualmente y otras una única vez.' +
        ' El flujo será el siguiente:',
      flow: [
        () =>
          'Podrás describir un poco tu idea en el campo de descripción' +
          ' y luego elegir las características que te gustaría tener en tu sition web.',
        user => (
          <p>
            Cuando crees el pedido te vamos a contactar (
            <a target="blank" href={whatsappLink(user, 'es')}>
              o podés contactarnos desde acá
            </a>
            ) para ver tu idea más en detalle.
          </p>
        ),
        () =>
          'El pago inicial se realizará en 2 partes: cuando hagas la primera parte del pago' +
          ', podrás ver una vista previa de tu sitio solo estando logueado.' +
          ' Al realizar la segunda parte del pago y suscribirte al pago mensual' +
          ', tu web se hará pública automáticamente.'
      ]
    },
    en: {
      developmentRequest: 'Web development request',
      message: user =>
        `${user.name}, next we are going to show you` +
        ' all the features we offer nowadays.' +
        ' some of them are paid monthly and others only once.' +
        ' The flow will be the following:'
    }
  }[language_code]);

const Component = () => <></>;

export default Component;
