#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>
#include <limits.h>
#include <emscripten.h>

// ================= FUNÇÕES AUXILIARES ==============================

EMSCRIPTEN_KEEPALIVE
int mdc(int a, int b)
{
    if (b == 0)
    {
        return a;
    }
    else
    {
        return mdc(b, a % b);
    }
}

int isPrime(int n)
{
    if (n == 2 || n == 3)
    {
        return 1;
    }

    for (int i = 2; i <= sqrt(n); i++)
    {
        if (n % i == 0)
        {
            return 0;
        }
    }

    if (n != 1)
    {
        return 1;
    }
    else
    {
        return 0;
    }
}

// ===============================================

// A chave pública é constituída por dois elementos: n e e
// O elemento n é o produto de dois números primos p e q
// O elemento e é um expoente co-primo com o totiente de n
// O elemento d é o inverso multiplicativo de e módulo o totiente de n

// O par (n, e) forma a chave pública.
// O par (n, d) forma a chave privada.

/*
    TABELA DE ERROS: "n_factor"
        -1 = o valor de p ou q ultrapassa os limites da linguagem C
        -2 = o valor do produto de p e q é menor que 256, ou seja, a criptografia não é suficientemente segura
        -3 = o valor de p não é primo
        -4 = o valor de q não é primo
        -5 = o valor de p ou q não é primo
*/

/*
    CONCEITO MATEMÁTICO:
    "p" e "q" são dois números primos grandes distintos. Esses números são mantidos em segredo e não são compartilhados.
*/

int verifications(int p, int q)
{
    int is_p_prime = isPrime(p);
    int is_q_prime = isPrime(q);

    if (p > INT_MAX || q > INT_MAX)
    {
        return -1;
    }
    else if (p * q < 256)
    {
        return -2;
    }
    else if (!is_p_prime && is_q_prime)
    {
        return -3;
    }
    else if (!is_q_prime && is_p_prime)
    {
        return -4;
    }
    else if (!is_p_prime && !is_q_prime)
    {
        return -5;
    }
    else
    {
        return 1;
    }
}

// ELEMENTO DA CHAVE PÚBLICA E PRIVADA
EMSCRIPTEN_KEEPALIVE
unsigned long long n_factor(int p, int q)
{
    int verificationsResult = verifications(p, q);

    if (verificationsResult < 0)
    {
        return verificationsResult;
    }
    else
    {
        printf("p: %d e q: %d", p, q);
        return p * q;
    }
}

/*
    TABELA DE ERROS: "publicKey_totient"
        -1 = o valor de p ou q ultrapassa os limites da linguagem C
        -3 = o valor de p não é primo
        -4 = o valor de q não é primo
*/

/*
    CONCEITO MATEMÁTICO:
    O totiente de um número inteiro positivo n é denotado como φ(n)
    "Por exemplo, se n for um número primo, então φ(n) será igual a n - 1, pois todos os inteiros positivos menores que n são coprimos com n.
    Por outro lado, se n for o produto de dois números primos distintos, como n = p * q, onde p e q são primos diferentes,
    então φ(n) será igual a (p - 1) * (q - 1), porque apenas os múltiplos de p, os múltiplos de q e seus múltiplos comuns não são coprimos com n."

    Portanto, para calcular a chave privada utilizamos a função totiente de Euler calculando: φ(n) = (p - 1) * (q - 1)
*/

EMSCRIPTEN_KEEPALIVE
unsigned long long publicKey_totient(int p, int q)
{
    int verificationsResult = verifications(p, q);

    if (verificationsResult < 0)
    {
        return verificationsResult;
    }
    else
    {
        printf("p: %d e q: %d", p, q);
        return (p - 1) * (q - 1);
    }
}

/*
    CONCEITO MATEMÁTICO:
    Escolhemos um número inteiro positivo e relativamente primo (co-primo) a φ(n), geralmente chamado de "e" (exponente de encriptação)
    O valor de e deve ser menor do que φ(n) e maior do que 1.
*/

// 2ª ELEMENTO DA CHAVE PÚBLICA
EMSCRIPTEN_KEEPALIVE
int publicKey_e(int totient, int initialExponent)
{
    // Caso estejamos em uma requisição da função em loop, continuamos com base no último expoente retornado + 1
    // Caso contrário, começamos com o expoente 2, visto que o expoente deve ser maior que 1
    int exponent = initialExponent > 0 ? initialExponent + 1 : 2;

    while (mdc(exponent, totient) != 1)
    {
        exponent++;
    }

    return exponent;
}

/*
    CONCEITO MATEMÁTICO:
    Calculamos a chave privada d, que é o inverso multiplicativo de e modulo φ(n).
    Isso significa encontrar um número d tal que (d * e) % φ(n) = 1
*/

EMSCRIPTEN_KEEPALIVE
int privateKey_d(int totient, int exponent)
{
    int d = 1;
    while ((d * exponent) % totient != 1)
    {
        d++;
    }

    return d;
}

EMSCRIPTEN_KEEPALIVE
void sayHi()
{
    printf("Hi!\n");
}

EMSCRIPTEN_KEEPALIVE
int daysInWeek()
{
    return 7;
}