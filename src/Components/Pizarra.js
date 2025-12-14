import React, { useRef, useState, useEffect } from 'react';

// =================================================================
// === 1. DEFINICIÓN DE ESTILOS CSS INLINE Y JAVASCRIPT OBJECTS ===
// =================================================================

const styles = {
    // Estilos principales del contenedor (Simula el body/fondo)
    contenedorPrincipal: {
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#FFF8E1', /* Fondo muy claro, casi blanco-crema */
        padding: '20px',
        display: 'flex',
        justifyContent: 'center',
        minHeight: '100vh',
        boxSizing: 'border-box',
    },
    // Estilos del contenedor de la pizarra
    contenedorPizarra: {
        backgroundColor: '#FFFFFF',
        border: '5px solid #FFDAB9', /* Borde naranja suave */
        borderRadius: '15px',
        padding: '20px',
        boxShadow: '0 4px 15px rgba(255, 179, 71, 0.3)', /* Sombra suave */
        textAlign: 'center',
        maxWidth: '900px',
        width: '100%',
        margin: '20px auto',
    },
    titulo: {
        color: '#FFB347', /* Naranja medio para el título */
        marginBottom: '20px',
    },
    controles: {
        marginBottom: '15px',
        padding: '10px',
        backgroundColor: '#FFE5CC', /* Fondo de controles naranja muy claro */
        borderRadius: '8px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '15px',
    },
    // Estilos del botón (El hover es difícil de simular con estilos inline)
    borrarBtn: {
        padding: '8px 15px',
        border: 'none',
        backgroundColor: '#FF8C00', /* Naranja más fuerte para el botón */
        color: 'white',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
    },
    canvas: {
        display: 'block',
        border: '2px solid #FFDAB9',
        cursor: 'crosshair', 
        // El ancho y alto se establecen directamente en el Canvas JSX para mejor renderizado
    }
};

// =================================================================
// === 2. COMPONENTE REACT Y LÓGICA DE DIBUJO ===
// =================================================================

const Pizarra = () => {
    const canvasRef = useRef(null);
    const [currentColor, setCurrentColor] = useState('#FFB347'); 
    
    // Usamos useRef para mantener las variables que cambian pero no deben re-renderizar
    const drawingStateRef = useRef({
        isDrawing: false,
        lastX: 0,
        lastY: 0
    });

    // -------------------------------------------------------------
    // SETUP: Inicialización y limpieza del lienzo
    // -------------------------------------------------------------
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        // El tamaño debe ser nativo del canvas
        canvas.width = 800;
        canvas.height = 500;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.lineWidth = 5;
        ctx.lineCap = 'round';
        ctx.strokeStyle = currentColor;
        
        // Rellenar de blanco
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

    }, []);

    // Actualiza el color del trazo cuando cambia el estado
    useEffect(() => {
        const ctx = canvasRef.current?.getContext('2d');
        if (ctx) {
            ctx.strokeStyle = currentColor;
        }
    }, [currentColor]);

    // -------------------------------------------------------------
    // FUNCIONES DE DIBUJO
    // -------------------------------------------------------------

    const getCoords = (e) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        // Manejo de eventos de ratón y táctiles
        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        const clientY = e.clientY || (e.touches && e.touches[0].clientY);
        
        return {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
    };

    const draw = (e) => {
        const state = drawingStateRef.current;
        const ctx = canvasRef.current.getContext('2d');
        
        if (!state.isDrawing) return;
        
        const { x, y } = getCoords(e);

        ctx.beginPath();
        ctx.moveTo(state.lastX, state.lastY);
        ctx.lineTo(x, y);
        ctx.stroke();
        
        // Actualiza el último punto
        state.lastX = x;
        state.lastY = y;
    };

    const startDrawing = (e) => {
        const state = drawingStateRef.current;
        state.isDrawing = true;
        
        // Obtener y establecer el punto de inicio
        const { x, y } = getCoords(e);
        state.lastX = x;
        state.lastY = y;
    };

    const stopDrawing = () => {
        drawingStateRef.current.isDrawing = false;
    };
    
    const handleClear = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    // -------------------------------------------------------------
    // RENDERIZADO (JSX)
    // -------------------------------------------------------------

    return (
        <div style={styles.contenedorPrincipal}>
            <div style={styles.contenedorPizarra}>
                <h1 style={styles.titulo}>🎨🖌️Pizarra Mágica</h1>

                <div style={styles.controles}>
                    <label htmlFor="color-picker">Color del Lápiz:</label>
                    <input 
                        type="color" 
                        id="color-picker" 
                        value={currentColor} 
                        onChange={(e) => setCurrentColor(e.target.value)} 
                    />
                    
                    <button 
                        style={styles.borrarBtn} 
                        onClick={handleClear}
                    >
                        🗑️ Borrar Todo
                    </button>
                </div>

                <canvas 
                    ref={canvasRef} 
                    style={styles.canvas}
                    // Eventos de ratón
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseOut={stopDrawing}
                    // Eventos táctiles
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                />
            </div>
        </div>
    );
};

export default Pizarra;
