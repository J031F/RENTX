import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory.";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayJsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let mailProviderInMemory: MailProviderInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;

describe("Send Forgot Mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    mailProviderInMemory = new MailProviderInMemory();
    dateProvider = new DayjsDateProvider();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProviderInMemory
    );
  });

  it("Should be able to send a forgot password email to user", async () => {
    const sendMail = jest.spyOn(mailProviderInMemory, "sendMail");

    await usersRepositoryInMemory.create({
      driver_license: "147365",
      email: "niusica@mogu.cu",
      name: "Leah Kim",
      password: "password",
    });

    await sendForgotPasswordMailUseCase.execute("niusica@mogu.cu");

    expect(sendMail).toHaveBeenCalled();
  });

  it("Should not be able to send email if user does not exist", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("cecaw@van.mq")
    ).rejects.toEqual(new AppError("User does not exist"));
  });

  it("Should be able to create a new user token", async () => {
    const userToken = jest.spyOn(usersTokensRepositoryInMemory, "create");

    await usersRepositoryInMemory.create({
      driver_license: "933127",
      email: "avbo@jucno.do",
      name: "Leah Kim",
      password: "password",
    });

    await sendForgotPasswordMailUseCase.execute("avbo@jucno.do");

    expect(userToken).toBeCalled();
  });
});
