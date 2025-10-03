import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function MaxTwoDecimals(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'maxTwoDecimals',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          // Solo valida números
          if (typeof value !== 'number') return false;
          // Convertimos a string y validamos máximo 2 decimales
          return /^\d+(\.\d{1,2})?$/.test(value.toString());
        },
        defaultMessage(args: ValidationArguments) {
          return 'El sueldo debe tener como máximo dos decimales';
        }
      }
    });
  };
}
