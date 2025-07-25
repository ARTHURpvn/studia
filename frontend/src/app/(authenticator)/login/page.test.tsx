import { describe, expect, it, jest } from "@jest/globals";
import { screen } from "@testing-library/dom";
import { fireEvent, render, waitFor } from "@testing-library/react";

import { useAuthStore } from "@/store/useAuthStore";

import LoginPage from "./page";

// Mock do useRouter do Next
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock do Zustand
jest.mock("@/store/useAuthStore", () => ({
  useAuthStore: {
    getState: () => ({
      login: jest.fn(async () => true),
    }),
  },
}));

describe("LoginPage", () => {
  it("renderiza campos de email e senha", () => {
    render(<LoginPage />);

    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Senha")).toBeInTheDocument();
    expect(screen.getByText("Enviar")).toBeInTheDocument();
  });

  it("valida campos obrigatórios", async () => {
    render(<LoginPage />);

    fireEvent.click(screen.getByText("Enviar"));

    await waitFor(() => {
      expect(screen.getByText("Email inválido")).toBeInTheDocument();
      expect(
        screen.getByText("A senha deve ter no mínimo 8 caracteres."),
      ).toBeInTheDocument();
    });
  });

  it("chama a função de login com os dados corretos", async () => {
    const mockLogin = jest.fn(async () => true);
    // substitui o login por mock em tempo real
    useAuthStore.getState = () => ({
      login: mockLogin,
      authUser: {
        userId: "fakeId",
        name: "Teste",
      }, // ou um objeto mockado de usuário, se necessário
    });

    render(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "arthursppavan@gmail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Senha"), {
      target: { value: "Arthur123@" },
    });

    fireEvent.click(screen.getByText("Enviar"));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: "arthursppavan@gmail.com",
        password: "Arthur123@",
      });
    });
  });
});
