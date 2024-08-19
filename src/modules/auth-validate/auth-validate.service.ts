
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CORREO } from 'src/Common/constants/constantService';

//import { ReqErrorDto } from 'src/DTO/Payment/reqErrorDto.dto';
//import { ReqSuccessDto } from 'src/DTO/Payment/reqSuccessDto.dto';
//import { ResMessage } from 'src/DTO/resController/RespMessage.dto';
import { Repository } from 'typeorm';
import { CreateSaleRequest } from '../sale/request/CreateSaleRequest.request';
import { User } from '../user/entity/UserEntity.entity';
import { ResMessage } from '../sale/request/ResMessage.dto';
import { ReqSuccessDto } from '../sale/request/reqSuccesDto.dto';
import { ReqErrorDto } from '../sale/request/reqErrorDto.dto';
import { ValidateEmailSmsEntity } from './entity/ValidateEmailSms.entity';

@Injectable()
export class AuthValidateService {
    constructor(
      private readonly mailerService: MailerService,
      @InjectRepository(User)
        private readonly userRepository: Repository<User>,
      @InjectRepository(ValidateEmailSmsEntity) 
        private validateRepository: Repository<ValidateEmailSmsEntity>,
    ){
}

    async sendMailUser(request: CreateSaleRequest){
        var res = new ResMessage();
        var user = await this.userRepository.findOne({ where: { IdUser: request.IdUser } })

         await this.mailerService.sendMail(
            {
                to: CORREO,
                from: 'jhedgost@gmail.com',
                subject: `PAGO POR ACEPTAR....`,
                text: 'welcome a jhedgost',
                html: `<div
  style="
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande',
      'Lucida Sans', Arial, sans-serif;
    background-color: #ffffff;
    text-align: center;
    font-size: 16px;
    margin: 0;
    padding: 0;
  "
>
  <div
    style="
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
    "
  >
    <div style="display: block; align-items: center; margin-bottom: 20px">
      <img
        src="https://img.freepik.com/premium-vector/gradient-code-logo-tagline-here_23-2148808179.jpg"
        alt="Logo"
        style="width: 50px; height: auto; margin-right: 10px"
      />
      <p
        style="
          font-family: Verdana, Geneva, Tahoma, sans-serif;
          color: #0f0f0f;
          font-size: 32px;
          font-weight: bold;
          margin: 10px 0;
        "
      >
        CONTROLZ
      </p>
    </div>
    <div style="display: block;">
        <div
        style="
        display: block;
          width: 80%;
          max-width: 600px;
          background-color: #0f0f0f;
          color: #ffffff;
          padding: 40px;
          margin: 20px auto;
          text-align: left;
          border-radius: 6px;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        "
      >
        <div>
          <p
            style="
              font-family: Verdana, Geneva, Tahoma, sans-serif;
              color: #fff;
              font-size: 28px;
              font-weight: bold;
              margin: 10px 0;
            "
          >
            ¡Hola! ${CORREO} 🚀
          </p>
          <p style="color: #fff">
            Has recibido una solicitud de compra para productos. 📝 Te solicitamos
            revisar detalladamente el comprobante de pago adjunto para proceder
            con la confirmación de compra. Una vez verificado el voucher de pago,
            procederemos a completar la solicitud. ✅
          </p>
        </div>
        <hr />
        <div style="margin-top: 30px; font-size: 16px; color: #fff">
          <p>
            <span style="font-weight: bold; color: #f92f60; margin-bottom: 13px"
              >Nombres:</span
            >${user.FirstName} <br />
            <span style="font-weight: bold; color: #f92f60; margin-bottom: 13px"
              >Apellidos:</span
            >
            ${user.LastName} <br />
            <span style="font-weight: bold; color: #f92f60; margin-bottom: 13px"
              >Dni:</span
            >
            ${user.Dni} <br />
            <span style="font-weight: bold; color: #f92f60; margin-bottom: 13px"
              >Teléfono:</span
            >
            ${user.Phone} <br />
            <span style="font-weight: bold; color: #f92f60; margin-bottom: 13px"
              >Gmail:</span
            >
            ${user.Mail} <br />
            <span style="font-weight: bold; color: #f92f60; margin-bottom: 13px"
              >Total:</span
            >${request.Total} <br />
            <span style="font-weight: bold; color: #f92f60; margin-bottom: 13px"
              >Voucher:</span
            >
            <img
              src= ${request.ImagePayment}
              alt="User Image"
              style="width: 300px; height: auto; margin-left: 10px"
            />
          </p>
          <div style="display: flex; justify-content: flex-end; margin-top: 20px">
            <a
              href="https://bkmaferyogurt-production.up.railway.app/api/sale/acceptPayment/${request.IdCart}/${request.IdUser}"
              style="
                background-color: #f92f60;
                color: #ffffff;
                margin-right: 10px;
                border: none;
                padding: 10px 20px;
                font-size: 16px;
                cursor: pointer;
                border-radius: 4px;
              "
            >
              Confirmar Compra
          </a>
            <a
            href="https://bkmaferyogurt-production.up.railway.app/api/sale/failPayment/${request.IdCart}/${request.IdUser}"
              style="
                background-color: #333;
                color: #ffffff;
                border: none;
                padding: 10px 20px;
                font-size: 16px;
                cursor: pointer;
                border-radius: 4px;
              "
            >
              Rechazar Compra
          </a>
          </div>
  
          <p style="margin-top: 20px; color: #fff">
            ¿Necesitas ayuda? Contacta con nuestro equipo de soporte técnico
            <a
              href="https://jheysonjhairpro.ccontrolz.com/"
              target="_blank"
              style="
                color: #f92f60;
                text-decoration: none;
                font-weight: bold;
                font-size: 14px;
              "
              >aquí</a
            >. ¿Quieres darnos tu opinión? ¡Dinos lo que piensas en nuestra
            <a
              href="https://jheysonjhairpro.ccontrolz.com/"
              target="_blank"
              style="
                color: #f92f60;
                text-decoration: none;
                font-weight: bold;
                font-size: 14px;
              "
              >página de opiniones</a
            >.
          </p>
        </div>
      </div>
      <div style="display:block, 30px; font-size: 13px; color: #000">
        <p>
          Enviado por Developers,
          <a
            href="https://jheysonjhairpro.ccontrolz.com/"
            target="_blank"
            style="
              color: #f92f60;
              text-decoration: none;
              font-weight: bold;
              font-size: 14px;
            "
            >consulta nuestro blog</a
          >
          De CONTROLZ, Perú 2024
        </p>
      </div>
    </div>
  </div>
</div>`,
            }
        )
        return res.resultOK("Se envio correctamente");
    }
    
    

    async sendPaymentSuccess(request: ReqSuccessDto){
        var res = new ResMessage();

          // Construir la lista de productos en HTML
  const itemsHtml = request.Items.map(item => `
    <li>
      Producto: ${item.Product.Name} <br>
      Cantidad: ${item.Quantity} <br>
    </li>
  `).join('');

    var metodoPago = 'PAGO CON YAPE ';
    if(request.MethodPayment){
      metodoPago =' PAGO CON TARJETA'
    }
    var metodoEnvio = 'RECOJO EN TIENDA';
    var ubicacion = request.Shipment.Address+', Abancay';


    if(request.Methodship === false){
      metodoEnvio = 'DELIVERY'
      ubicacion = request.Shipment.Address + ',' + request.Shipment.District +', '+request.Shipment.Province + ',' + request.Shipment.Region 
    }



  await this.mailerService.sendMail({
    to: request.Mail,
    from: 'jhedgost@gmail.com',
    subject: `PAGO CONFIRMADO`,
    text: 'welcome a jhedgost',
    html: `<div
      style="
        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande',
          'Lucida Sans', Arial, sans-serif;
        background-color: #ffffff;
        text-align: center;
        font-size: 16px;
        margin: 0;
        padding: 0;
      "
    >
      <div
        style="
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
        "
      >
        <div style="display: block; align-items: center; margin-bottom: 20px">
          <img
            src="https://img.freepik.com/premium-vector/gradient-code-logo-tagline-here_23-2148808179.jpg"
            alt="Logo"
            style="width: 50px; height: auto; margin-right: 10px"
          />
          <p
            style="
              font-family: Verdana, Geneva, Tahoma, sans-serif;
              color: #0f0f0f;
              font-size: 32px;
              font-weight: bold;
              margin: 10px 0;
            "
          >
            CONTROLZ
          </p>
        </div>
        <div style="display: block">
          <div
            style="
              width: 80%;
              max-width: 600px;
              background-color: #0f0f0f;
              color: #ffffff;
              padding: 40px;
              margin: 20px auto;
              text-align: left;
              border-radius: 6px;
              box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            "
          >
            <div>
              <p
                style="
                  font-family: Verdana, Geneva, Tahoma, sans-serif;
                  color: #fff;
                  font-size: 28px;
                  font-weight: bold;
                  margin: 10px 0;
                "
              >
                ¡Hola ${request.User}! 🚀
              </p>
              <p style="color: #fff">
                Hemos revisado el comprobante de pago adjunto y nos complace
                informarte que tu compra ha sido aceptada. 🎉
              </p>
              <p style="color: #fff">
                A continuación, los detalles de tu compra:
              </p>
              
              <p style="color: #fff">
              Metodo de envio: ${metodoEnvio} - Ubicacion: ${ubicacion}
              </p>
              
              <p style="color: #fff">
                Metodo de pago: ${metodoPago}
              </p>
              
              <ul style="color: #fff; list-style-type: none; padding: 0;">
                ${itemsHtml}
              </ul>
              
              <p style="color: #fff">
              El Total: ${request.Total}
              </p>
              
            </div>
            <hr />
            <div style="margin-top: 30px; font-size: 16px; color: #fff">
              <p>
                ¿Necesitas ayuda? Contacta con nuestro equipo de soporte técnico
                <a
                  href="https://jheysonjhairpro.ccontrolz.com/"
                  target="_blank"
                  style="
                    color: #f92f60;
                    text-decoration: none;
                    font-weight: bold;
                    font-size: 14px;
                  "
                  >aquí</a
                >. ¿Quieres darnos tu opinión? ¡Dinos lo que piensas en nuestra
                <a
                  href="https://jheysonjhairpro.ccontrolz.com/"
                  target="_blank"
                  style="
                    color: #f92f60;
                    text-decoration: none;
                    font-weight: bold;
                    font-size: 14px;
                  "
                  >página de opiniones</a
                >.
              </p>
            </div>
          </div>
          <div style="margin-top: 30px; font-size: 13px; color: #000">
            <p>
              Enviado por Developers,
              <a
                href="https://jheysonjhairpro.ccontrolz.com/"
                target="_blank"
                style="
                  color: #f92f60;
                  text-decoration: none;
                  font-weight: bold;
                  font-size: 14px;
                "
                >consulta nuestro blog</a
              >
              De CONTROLZ, Perú 2024
            </p>
          </div>
        </div>
      </div>
    </div>`,
    });
  return res.resultOK("Se envio correctamente");
    }

    async sendPaymentError(request: ReqErrorDto){
        var res = new ResMessage();

         await this.mailerService.sendMail(
            {
                to: request.Mail,
                from: 'jhedgost@gmail.com',
                subject: `PAGO ERRONEO`,
                text: 'welcome a jhegost',
                html: `<div
  style="
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande',
      'Lucida Sans', Arial, sans-serif;
    background-color: #ffffff;
    text-align: center;
    font-size: 16px;
    margin: 0;
    padding: 0;
  "
>
  <div
    style="
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
    "
  >
    <div style="display: block; align-items: center; margin-bottom: 20px">
      <img
        src="https://img.freepik.com/premium-vector/gradient-code-logo-tagline-here_23-2148808179.jpg"
        alt="Logo"
        style="width: 50px; height: auto; margin-right: 10px"
      />
      <p
        style="
          font-family: Verdana, Geneva, Tahoma, sans-serif;
          color: #0f0f0f;
          font-size: 32px;
          font-weight: bold;
          margin: 10px 0;
        "
      >
        CONTROLZ
      </p>
    </div>
    <div style="display: block">
      <div
        style="
          width: 80%;
          max-width: 600px;
          background-color: #0f0f0f;
          color: #ffffff;
          padding: 40px;
          margin: 20px auto;
          text-align: left;
          border-radius: 6px;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        "
      >
        <div>
          <p
            style="
              font-family: Verdana, Geneva, Tahoma, sans-serif;
              color: #fff;
              font-size: 28px;
              font-weight: bold;
              margin: 10px 0;
            "
          >
            ¡Hola ${request.user}! 🚀
          </p>
          <p style="color: #fff">
            Hemos revisado el comprobante de pago adjunto y lamentablemente no
            podemos proceder con la confirmación de tu compra en este momento.
            Por favor, verifica nuevamente el voucher de pago adjunto y
            asegúrate de que todos los detalles sean correctos. Y realice nuevamente la compra.
          </p>
        </div>
        
        <hr />
        <div style="margin-top: 30px; font-size: 16px; color: #fff">
          <p>
            <span style="font-weight: bold; color: #f92f60; margin-bottom: 13px"
              >Voucher:</span
            >
            <img
              src=${request.Img}
              alt="User Image"
              style="width: 200px; height: auto; margin-left: 10px"
            />
          </p>
        </div>
      </div>
      <div style="margin-top: 30px; font-size: 13px; color: #000">
        <p>
          Enviado por Developers,
          <a
            href="https://jheysonjhairpro.ccontrolz.com/"
            target="_blank"
            style="
              color: #f92f60;
              text-decoration: none;
              font-weight: bold;
              font-size: 14px;
            "
            >consulta nuestro blog</a
          >
          De CONTROLZ, Perú 2024
        </p>
      </div>
    </div>
  </div>
</div>`,
            }
        )
        return res.resultOK("Se envio correctamente");
    }
    async sendMail(email: string){
      const userMail = await this.userRepository.findOne({ where: { Mail: email,Deleted:false } });
  
      if (userMail) {
        return { msg: "Ya se registró un usuario con ese EMAIL", success: false, data: null };
      }
      var res = new ResMessage();

      var code = Math.floor(100000 + Math.random() * 900000).toString();
      
      var existing = await this.validateRepository.findOne({
          where: {Email:email}
      })

      if(existing != null){
          await this.validateRepository.delete(existing);
      }

      var nuevo = new ValidateEmailSmsEntity();
          nuevo.Email = email;
          nuevo.Code = code;
          const newValidate = this.validateRepository.create(nuevo)
          await this.validateRepository.save(newValidate)

      var nameEmail = this.obtenerNombreEmail(email);

       await this.mailerService.sendMail(
          {
              to: email,
              from: 'jhedgost@gmail.com',
              subject: `Tu código de verificación es: ${code}`,
              text: 'welcome jhedgost',
              html: ` <div style=" font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif; background-color: #f9f9f9; text-align: center; font-size: 16px; height: 100vh; margin: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; " > <div> <div style=" display: flex; justify-content: center; align-items: center; flex-direction: row; " > <img src="https://thumbs.dreamstime.com/b/fast-initial-letter-logo-vector-wing-da-todz-143202718.jpg" alt="Dizzgo Logo" style="width: 50px; height: auto; border-radius: 50%" /> <p style=" font-family: Verdana, Geneva, Tahoma, sans-serif; color: #40a5e7; font-size: 25px; font-weight: bold; margin: 10px 0; " > Dizzgo </p> </div> <div style=" width: 40%; background-color: #161b21; color: #a3aabf; padding: 40px; margin: 20px auto; text-align: left; border-radius: 6px; " > <div> <p style="color: #ffffff; font-weight: bold; font-size: 20px"> Hey ${nameEmail} </p> <p style="margin-top: 8px;;margin-bottom: 8px;"> ¡Gracias por registrarte para obtener una cuenta en Dizzgo! Antes de comenzar, solo necesitamos confirmar que eres tú. Copia el siguiente código e introdúce en la aplicación para verificar su dirección de correo electrónico: </p> <div style=" display: inline-block; border-radius: 8px; background-color: #40a5e7; color: #fff; padding: 10px; font-size: 20px; font-weight: bold; margin-top: 15px; margin-bottom: 15px; " > <p style="margin: 0;">${code}</p> </div> </div> <hr /> <div style="margin-top: 30px"> <p style="margin-top: 8px;;margin-bottom: 8px;"> ¿Necesitas ayuda? <a style="color: #40a5e7" href="https://jheysonjhairpro.ccontrolz.com/" target="_blank" >Contacta con nuestro equipo de soporte técnico</a >. ¿Quieres darnos tu opinión? ¡Dinos lo que piensas en nuestra <a style="color: #40a5e7" href="https://jheysonjhairpro.ccontrolz.com/" target="_blank" >página de opiniones</a >. </p> </div> </div> <div style=" font-size: 13px; color: #a1b0ba; font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif; " > <p> Enviado por Dizgo <a style="color: #40a5e7" href="https://jheysonjhairpro.ccontrolz.com/" target="_blank" >Consulta nuestro blog</a > De ControlZ , Perú 2024 </p> </div> </div> </div>`,
          }
      )
      
      return res.resultOK("Se envio correctamente");
  }

  async sendMailRecoverPassword(email: string){
      var res = new ResMessage();

      var code = Math.floor(100000 + Math.random() * 900000).toString();
      
      var existing = await this.validateRepository.findOne({
          where: {Email:email}
      })

      if(existing != null){
          await this.validateRepository.delete(existing);
      }

      var nuevo = new ValidateEmailSmsEntity();
          nuevo.Email = email;
          nuevo.Code = code;
          const newValidate = this.validateRepository.create(nuevo)
          await this.validateRepository.save(newValidate)

      var nameEmail = this.obtenerNombreEmail(email);

       await this.mailerService.sendMail(
          {
              to: email,
              from: 'jhedgost@gmail.com',
              subject: `Tu código de recuperación es: ${code}`,
              text: 'Recuperacion de contraseña jhedgost',
              html: ` <div style=" font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif; background-color: #f9f9f9; text-align: center; font-size: 16px; height: 100vh; margin: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; " > <div> <div style=" display: flex; justify-content: center; align-items: center; flex-direction: row; " > <img src="https://thumbs.dreamstime.com/b/fast-initial-letter-logo-vector-wing-da-todz-143202718.jpg" alt="Dizzgo Logo" style="width: 50px; height: auto; border-radius: 50%" /> <p style=" font-family: Verdana, Geneva, Tahoma, sans-serif; color: #40a5e7; font-size: 25px; font-weight: bold; margin: 10px 0; " > Dizzgo </p> </div> <div style=" width: 40%; background-color: #161b21; color: #a3aabf; padding: 40px; margin: 20px auto; text-align: left; border-radius: 6px; " > <div> <p style="color: #ffffff; font-weight: bold; font-size: 20px"> Hey ${nameEmail} </p> <p style="margin-top: 8px;;margin-bottom: 8px;"> Le proporcionamos el código de verificación para recuperar su contraseña. Por favor, utilícelo en la aplicación correspondiente para verificar su dirección de correo electrónico: </p> <div style=" display: inline-block; border-radius: 8px; background-color: #40a5e7; color: #fff; padding: 10px; font-size: 20px; font-weight: bold; margin-top: 15px; margin-bottom: 15px; " > <p style="margin: 0;">${code}</p> </div> </div> <hr /> <div style="margin-top: 30px"> <p style="margin-top: 8px;;margin-bottom: 8px;"> ¿Necesitas ayuda? <a style="color: #40a5e7" href="https://jheysonjhairpro.ccontrolz.com/" target="_blank" >Contacta con nuestro equipo de soporte técnico</a >. ¿Quieres darnos tu opinión? ¡Dinos lo que piensas en nuestra <a style="color: #40a5e7" href="https://jheysonjhairpro.ccontrolz.com/" target="_blank" >página de opiniones</a >. </p> </div> </div> <div style=" font-size: 13px; color: #a1b0ba; font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif; " > <p> Enviado por Dizgo <a style="color: #40a5e7" href="https://jheysonjhairpro.ccontrolz.com/" target="_blank" >Consulta nuestro blog</a > De ControlZ , Perú 2024 </p> </div> </div> </div>`,
          }
      )
      
      return res.resultOK("Se envio correctamente");
  }

    obtenerNombreEmail(email: string){
        var name = '';
        for(var i= 0;i< email.length;i++){
            if(email[i] === '@'){
                break;
            }
            name += email[i];
        }

        return name;
    }
}
