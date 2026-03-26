import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getErrorMessageCategory(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const messages: Record<number, string> = {
      401: "Você não tem permissão para realizar esta ação.",
      403: "Acesso negado.",
      404: "Categoria não encontrada.",
      400: "Já existe uma categoria com esse nome.", // Mudar para 409 depois no backend
      500: "Erro interno do servidor. Tente novamente.",
    };
    return messages[status ?? 0] ?? "Ocorreu um erro inesperado.";
  }
  return "Ocorreu um erro inesperado.";
}

export function getErrorMessageSubCategory(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const messages: Record<number, string> = {
      401: "Você não tem permissão para realizar esta ação.",
      403: "Acesso negado.",
      404: "Sub-categoria não encontrada.",
      400: "Já existe uma sub-categoria com esse nome.",
      500: "Erro interno do servidor. Tente novamente.",
    };
    return messages[status ?? 0] ?? "Ocorreu um erro inesperado.";
  }
  return "Ocorreu um erro inesperado.";
}

export function getErrorMessageAuthor(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const messages: Record<number, string> = {
      401: "Você não tem permissão para realizar esta ação.",
      403: "Acesso negado.",
      404: "Autor não encontrado.",
      400: "Já existe um autor com esse nome.",
      500: "Erro interno do servidor. Tente novamente.",
    };
    return messages[status ?? 0] ?? "Ocorreu um erro inesperado.";
  }
  return "Ocorreu um erro inesperado.";
}

export function getErrorMessageSector(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const messages: Record<number, string> = {
      401: "Você não tem permissão para realizar esta ação.",
      403: "Acesso negado.",
      404: "Setor não encontrado.",
      400: "Já existe um setor com esse nome ou letra.",
      500: "Erro interno do servidor. Tente novamente.",
    };
    return messages[status ?? 0] ?? "Ocorreu um erro inesperado.";
  }
  return "Ocorreu um erro inesperado.";
}