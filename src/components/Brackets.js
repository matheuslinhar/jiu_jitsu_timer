import React, { useState } from 'react';
import '../styles/Brackets.css';

function Brackets() {
    const [lutadores, setLutadores] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [fases, setFases] = useState([]);
    const [vencedores, setVencedores] = useState([]);

    // Função para adicionar lutadores na lista
    const adicionarLutador = () => {
        if (inputValue !== '') {
            setLutadores([...lutadores, inputValue]);
            setInputValue(''); // Limpar input
        }
    };

    // Função para gerar as rodadas
    const gerarRodadas = () => {
        let rodadas = [];
        let competidores = [...lutadores];
        
        while (competidores.length > 1) {
            let rodada = [];
            for (let i = 0; i < competidores.length; i += 2) {
                if (competidores[i + 1]) {
                    rodada.push([competidores[i], competidores[i + 1]]);
                } else {
                    rodada.push([competidores[i]]); // Avança automaticamente se for ímpar
                }
            }
            rodadas.push(rodada);
            competidores = rodadas[rodadas.length - 1].map(match => match[0]); // Ganha o primeiro por padrão
        }
        setFases(rodadas);
    };

    // Função para selecionar o vencedor
    const selecionarVencedor = (faseIndex, matchIndex, vencedor) => {
        let rodadasAtualizadas = [...fases];
        rodadasAtualizadas[faseIndex][matchIndex][0] = vencedor;
        setFases(rodadasAtualizadas);

        // Atualiza vencedores para a próxima fase
        if (faseIndex + 1 < rodadasAtualizadas.length) {
            rodadasAtualizadas[faseIndex + 1][Math.floor(matchIndex / 2)][0] = vencedor;
        } else {
            setVencedores([...vencedores, vencedor]); // Adiciona ao array de vencedores
        }
    };

    return (
        <div className="brackets-container">
            <h1>Torneio de Jiu-Jítsu</h1>
            <div className="adicionar-lutador">
                <input
                    type="text"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    placeholder="Digite o nome do lutador"
                />
                <button onClick={adicionarLutador}>Adicionar Lutador</button>
            </div>
            <div className="lutadores-lista">
                <h3>Lutadores Adicionados:</h3>
                <ul>
                    {lutadores.map((lutador, index) => (
                        <li key={index}>{lutador}</li>
                    ))}
                </ul>
                {lutadores.length > 1 && (
                    <button onClick={gerarRodadas}>Gerar Torneio</button>
                )}
            </div>

            <div className="fases">
                {fases.map((fase, faseIndex) => (
                    <div key={faseIndex} className="fase">
                        <h3>Fase {faseIndex + 1}</h3>
                        {fase.map((match, matchIndex) => (
                            <div key={matchIndex} className="match">
                                <span>{match[0]}</span> vs{' '}
                                {match[1] ? <span>{match[1]}</span> : '---'}
                                <br />
                                <button onClick={() => selecionarVencedor(faseIndex, matchIndex, match[0])}>
                                    Vencedor: {match[0]}
                                </button>
                                {match[1] && (
                                    <button onClick={() => selecionarVencedor(faseIndex, matchIndex, match[1])}>
                                        Vencedor: {match[1]}
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {vencedores.length > 0 && (
                <div className="campeao">
                    <h2>Campeão: {vencedores[vencedores.length - 1]}</h2>
                </div>
            )}
        </div>
    );
}

export default Brackets;