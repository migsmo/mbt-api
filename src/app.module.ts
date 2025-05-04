import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppointmentBillingsModule } from './appointment-billings/appointment-billings.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './commons/common.module';
import { CustomersModule } from './customers/customers.module';
import { EmployeesModule } from './employees/employees.module';
import { ServicesModule } from './services/service.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'production' ? '.prod.env' : '.env',
      isGlobal: true,
    }),
    CommonModule,
    ServicesModule,
    AppointmentsModule,
    EmployeesModule,
    CustomersModule,
    AppointmentBillingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
