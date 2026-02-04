// ===================================
// VARIABLES GLOBALES
// ===================================
const navbar = document.getElementById(‘navbar’);
const navToggle = document.getElementById(‘navToggle’);
const navMenu = document.getElementById(‘navMenu’);
const navLinks = document.querySelectorAll(’.nav-link’);
const chatInput = document.getElementById(‘chatInput’);
const sendBtn = document.getElementById(‘sendBtn’);
const chatMessages = document.getElementById(‘chatMessages’);
const contactForm = document.getElementById(‘contactForm’);
const suggestionChips = document.querySelectorAll(’.chip’);

// ===================================
// NAVBAR - SCROLL & TOGGLE
// ===================================

// Cambiar estilo del navbar al hacer scroll
window.addEventListener(‘scroll’, () => {
if (window.scrollY > 50) {
navbar.classList.add(‘scrolled’);
} else {
navbar.classList.remove(‘scrolled’);
}

```
// Animación de elementos al hacer scroll
animateOnScroll();
```

});

// Toggle menú móvil
navToggle.addEventListener(‘click’, () => {
navMenu.classList.toggle(‘active’);
navToggle.classList.toggle(‘active’);
});

// Cerrar menú al hacer click en un enlace
navLinks.forEach(link => {
link.addEventListener(‘click’, () => {
navMenu.classList.remove(‘active’);
navToggle.classList.remove(‘active’);

```
    // Smooth scroll con offset para el navbar fijo
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
});
```

});

// ===================================
// ANIMACIONES AL SCROLL
// ===================================
function animateOnScroll() {
const elements = document.querySelectorAll(’.feature-item, .servicio-card, .team-card’);

```
elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (elementTop < windowHeight - 100) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }
});
```

}

// Inicializar elementos para animación
document.addEventListener(‘DOMContentLoaded’, () => {
const animatedElements = document.querySelectorAll(’.feature-item, .servicio-card, .team-card’);
animatedElements.forEach(element => {
element.style.opacity = ‘0’;
element.style.transform = ‘translateY(30px)’;
element.style.transition = ‘all 0.6s ease-out’;
});
});

// ===================================
// CHATBOT - FUNCIONALIDAD
// ===================================

// Base de conocimiento del chatbot
const knowledgeBase = {
‘torneado’: {
keywords: [‘torneado’, ‘torno’, ‘torneado cnc’, ‘cnc’],
response: `El torneado es un proceso de mecanizado que consiste en hacer girar la pieza mientras una herramienta de corte se desplaza linealmente.

**Características principales:**
• Se utiliza para crear piezas cilíndricas
• Puede ser manual o CNC (Control Numérico Computarizado)
• Permite hacer cortes externos, internos y refrentados
• Ideal para producción de ejes, cilindros y componentes rotatorios

**Tipos de operaciones:**

1. Cilindrado exterior
1. Refrentado
1. Ranurado
1. Roscado
1. Taladrado en torno`}, 'fresado': { keywords: ['fresado', 'fresa', 'fresadora', 'fresas'], response:`El fresado es un proceso de mecanizado donde una herramienta rotatoria con múltiples filos de corte remueve material de una pieza fija.

**Tipos de fresas comunes:**
• Fresa cilíndrica: Para superficies planas
• Fresa frontal: Para acabados de superficies
• Fresa de bola: Para contornos 3D
• Fresa de desbaste: Para remoción rápida de material

**Aplicaciones:**

- Planeado de superficies
- Ranurado y cajeras
- Perfilado de formas complejas
- Fresado de engranajes

**Parámetros importantes:** Velocidad de corte, avance, profundidad de corte y refrigeración.`}, 'herramientas': { keywords: ['herramientas', 'herramienta', 'corte', 'herramientas de corte'], response:`Las herramientas de corte son fundamentales en manufactura. Aquí las principales:

**Herramientas para Torno:**
• Cuchillas de carburo
• Insertos intercambiables
• Herramientas de tronzado
• Brocas para taladrado

**Herramientas para Fresadora:**
• Fresas de diferentes geometrías
• Cabezales de corte
• Brocas escalonadas
• Machos de roscar

**Materiales comunes:**

1. Acero rápido (HSS)
1. Carburo de tungsteno
1. Cerámicas
1. Diamante policristalino (PCD)

**Mantenimiento:** Afilado regular, limpieza, almacenamiento adecuado y verificación de desgaste.`}, 'seguridad': { keywords: ['seguridad', 'protección', 'epp', 'riesgos', 'normas'], response:`La seguridad en talleres mecánicos es PRIORITARIA. Aquí las medidas esenciales:

**Equipo de Protección Personal (EPP):**
✓ Gafas de seguridad (obligatorio)
✓ Calzado de seguridad
✓ Ropa ajustada sin partes sueltas
✓ Protección auditiva en áreas ruidosas
✓ Guantes (SOLO cuando la máquina esté apagada)

**Reglas de seguridad:**

1. Nunca usar guantes con máquinas en movimiento
1. Recoger el cabello largo
1. No usar joyas o accesorios sueltos
1. Verificar que las piezas estén bien sujetas
1. Conocer la ubicación de paros de emergencia

**Antes de operar:**

- Inspeccionar la máquina
- Verificar guardas de seguridad
- Asegurar buena iluminación
- Mantener área limpia y libre de obstáculos`}, 'rectificado': { keywords: ['rectificado', 'rectificadora', 'muela', 'abrasivo'], response:`El rectificado es un proceso de acabado que utiliza muelas abrasivas para obtener alta precisión.

**Tipos de rectificadoras:**
• Rectificadora cilíndrica: Para exteriores e interiores de piezas cilíndricas
• Rectificadora plana: Para superficies planas
• Rectificadora sin centros: Para producción en masa
• Rectificadora de herramientas: Para afilado

**Ventajas:**

- Acabado superficial excelente
- Alta precisión dimensional
- Puede trabajar materiales muy duros
- Tolerancias de hasta micras

**Consideraciones:**
→ Velocidad periférica de la muela
→ Refrigeración adecuada para evitar quemaduras
→ Balanceo de muelas
→ Selección correcta de grano abrasivo`}, 'taladrado': { keywords: ['taladrado', 'taladro', 'broca', 'perforación'], response:`El taladrado es la operación de crear agujeros cilíndricos en materiales.

**Componentes clave:**
• Broca: Herramienta de corte rotatoria
• Mandril: Sujeta la broca
• Husillo: Transmite rotación y avance

**Tipos de brocas:**

1. Broca helicoidal estándar
1. Broca de centrar
1. Broca de pala
1. Broca escalonada
1. Broca para concreto

**Parámetros de corte:**

- RPM según diámetro y material
- Avance controlado
- Uso de refrigerante/lubricante
- Profundidad incremental en agujeros profundos

**Problemas comunes:**
× Desviación del agujero → Usar broca de centrar
× Rotura de broca → Reducir avance o RPM
× Mal acabado → Verificar afilado de broca`}, 'cnc': { keywords: ['cnc', 'control numérico', 'programación', 'código g'], response:`El CNC (Control Numérico Computarizado) revolucionó la manufactura moderna.

**Ventajas del CNC:**
✓ Alta precisión y repetibilidad
✓ Producción de geometrías complejas
✓ Reducción de errores humanos
✓ Mayor productividad
✓ Menor desperdicio de material

**Lenguaje de programación:**
El código G es el estándar:

- G00: Movimiento rápido
- G01: Interpolación lineal
- G02/G03: Interpolación circular
- M03/M04: Encendido de husillo
- M06: Cambio de herramienta

**Proceso típico:**

1. Diseño CAD de la pieza
1. Generación de trayectorias (CAM)
1. Post-procesado (código G)
1. Simulación
1. Mecanizado real

**Aplicaciones:** Desde prototipos hasta producción masiva en industrias aeroespacial, automotriz y médica.`
}
};

// Función para generar respuesta del bot
function generateBotResponse(userMessage) {
const messageLower = userMessage.toLowerCase();

```
// Buscar en la base de conocimiento
for (let topic in knowledgeBase) {
    const keywords = knowledgeBase[topic].keywords;
    if (keywords.some(keyword => messageLower.includes(keyword))) {
        return knowledgeBase[topic].response;
    }
}

// Respuestas para saludos
if (messageLower.includes('hola') || messageLower.includes('buenos') || messageLower.includes('saludos')) {
    return '¡Hola! 👋 Bienvenido a Smart Machining. Estoy aquí para ayudarte con tus dudas sobre manufactura mecánica. ¿Qué te gustaría saber?';
}

// Respuestas para agradecimientos
if (messageLower.includes('gracias') || messageLower.includes('thank')) {
    return '¡De nada! 😊 Estoy aquí para ayudarte. Si tienes más preguntas sobre herramientas, procesos o procedimientos mecánicos, no dudes en preguntar.';
}

// Respuesta por defecto
return `Entiendo tu pregunta sobre "${userMessage}". 
```

Puedo ayudarte con información sobre:
• **Procesos de mecanizado**: torneado, fresado, taladrado, rectificado
• **Herramientas de corte**: tipos, materiales, aplicaciones
• **Seguridad industrial**: EPP, normas, procedimientos
• **Tecnología CNC**: programación, operación, mantenimiento

¿Podrías reformular tu pregunta o elegir uno de estos temas?`;
}

// Función para agregar mensaje al chat
function addMessage(message, isUser = false) {
const messageDiv = document.createElement(‘div’);
messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;

```
const avatar = document.createElement('div');
avatar.className = 'message-avatar';
avatar.textContent = isUser ? '👤' : '🤖';

const content = document.createElement('div');
content.className = 'message-content';

// Convertir markdown simple a HTML
const formattedMessage = message
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>')
    .replace(/•/g, '▸');

content.innerHTML = `<p>${formattedMessage}</p>`;

messageDiv.appendChild(avatar);
messageDiv.appendChild(content);
chatMessages.appendChild(messageDiv);

// Scroll automático al último mensaje
chatMessages.scrollTop = chatMessages.scrollHeight;
```

}

// Función para manejar el envío de mensajes
function handleSendMessage() {
const message = chatInput.value.trim();

```
if (message === '') return;

// Agregar mensaje del usuario
addMessage(message, true);
chatInput.value = '';

// Simular "escribiendo..." y responder después de un delay
setTimeout(() => {
    const botResponse = generateBotResponse(message);
    addMessage(botResponse, false);
}, 800);
```

}

// Event listeners para el chatbot
sendBtn.addEventListener(‘click’, handleSendMessage);

chatInput.addEventListener(‘keypress’, (e) => {
if (e.key === ‘Enter’) {
handleSendMessage();
}
});

// Event listeners para chips de sugerencias
suggestionChips.forEach(chip => {
chip.addEventListener(‘click’, () => {
const suggestion = chip.textContent;
chatInput.value = suggestion;
handleSendMessage();
});
});

// ===================================
// FORMULARIO DE CONTACTO
// ===================================
contactForm.addEventListener(‘submit’, (e) => {
e.preventDefault();

```
const formData = {
    nombre: document.getElementById('nombre').value,
    email: document.getElementById('email').value,
    asunto: document.getElementById('asunto').value,
    mensaje: document.getElementById('mensaje').value
};

// Animación de envío
const submitBtn = contactForm.querySelector('.btn-primary');
const originalText = submitBtn.textContent;
submitBtn.textContent = 'Enviando...';
submitBtn.disabled = true;

// Simular envío (en producción, aquí iría la petición al servidor)
setTimeout(() => {
    // Mostrar mensaje de éxito
    alert('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.');
    
    // Resetear formulario
    contactForm.reset();
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
    
    console.log('Datos del formulario:', formData);
}, 1500);
```

});

// ===================================
// EFECTOS VISUALES ADICIONALES
// ===================================

// Efecto parallax suave en el hero
let lastScrollY = 0;
window.addEventListener(‘scroll’, () => {
const scrollY = window.scrollY;
const hero = document.querySelector(’.hero’);

```
if (hero && scrollY < window.innerHeight) {
    const cube = document.querySelector('.cube');
    if (cube) {
        cube.style.transform = `rotateX(${scrollY * 0.1}deg) rotateY(${scrollY * 0.15}deg)`;
    }
}

lastScrollY = scrollY;
```

});

// Animación de números (contador)
function animateCounter(element, target, duration = 2000) {
let current = 0;
const increment = target / (duration / 16);

```
const updateCounter = () => {
    current += increment;
    if (current < target) {
        element.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
    } else {
        element.textContent = target;
    }
};

updateCounter();
```

}

// Intersection Observer para animaciones
const observerOptions = {
threshold: 0.2,
rootMargin: ‘0px 0px -100px 0px’
};

const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.style.opacity = ‘1’;
entry.target.style.transform = ‘translateY(0)’;
}
});
}, observerOptions);

// Observar elementos que deben animarse
document.querySelectorAll(’.feature-item, .servicio-card, .team-card, .info-item’).forEach(el => {
observer.observe(el);
});

// ===================================
// EASTER EGG - Comando secreto en el chat
// ===================================
let secretCommandCounter = 0;

chatInput.addEventListener(‘input’, (e) => {
if (e.target.value.toLowerCase() === ‘/dev’) {
secretCommandCounter++;
if (secretCommandCounter === 1) {
e.target.value = ‘’;
addMessage(‘🎉 ¡Comando de desarrollador activado! Has descubierto un easter egg. Los creadores de Smart Machining te saludan. 👨‍💻👩‍💻’, false);
}
}
});

// ===================================
// TEMA DE COLOR DINÁMICO (opcional)
// ===================================
function setThemeColor(color) {
document.documentElement.style.setProperty(’–color-primary’, color);
}

// Detectar preferencia de esquema de color del sistema
if (window.matchMedia && window.matchMedia(’(prefers-color-scheme: dark)’).matches) {
// Ya está en modo oscuro por defecto
console.log(‘Modo oscuro detectado y aplicado’);
}

// ===================================
// PERFORMANCE OPTIMIZATIONS
// ===================================

// Lazy loading para imágenes (si se agregan en el futuro)
if (‘loading’ in HTMLImageElement.prototype) {
const images = document.querySelectorAll(‘img[loading=“lazy”]’);
images.forEach(img => {
img.src = img.dataset.src;
});
} else {
// Fallback para navegadores que no soportan lazy loading nativo
const script = document.createElement(‘script’);
script.src = ‘https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js’;
document.body.appendChild(script);
}

// Debounce para eventos de scroll
function debounce(func, wait) {
let timeout;
return function executedFunction(…args) {
const later = () => {
clearTimeout(timeout);
func(…args);
};
clearTimeout(timeout);
timeout = setTimeout(later, wait);
};
}

// Aplicar debounce al scroll
const debouncedScroll = debounce(() => {
animateOnScroll();
}, 50);

window.addEventListener(‘scroll’, debouncedScroll);

// ===================================
// INICIALIZACIÓN
// ===================================
console.log(’%c🔧 Smart Machining v1.0’, ‘color: #ff4757; font-size: 20px; font-weight: bold;’);
console.log(’%c¡Bienvenido al futuro de la educación en manufactura!’, ‘color: #3742fa; font-size: 14px;’);
console.log(’%cSitio desarrollado con HTML, CSS y JavaScript vanilla’, ‘color: #a4b0be; font-size: 12px;’);

// Log de inicialización
document.addEventListener(‘DOMContentLoaded’, () => {
console.log(‘✅ Sitio web cargado completamente’);
console.log(‘✅ Navegación inicializada’);
console.log(‘✅ Chatbot listo’);
console.log(‘✅ Formulario de contacto activo’);
console.log(‘✅ Animaciones configuradas’);
});

// ===================================
// SERVICE WORKER (opcional para PWA)
// ===================================
if (‘serviceWorker’ in navigator) {
// Descomentar para habilitar PWA en producción
// window.addEventListener(‘load’, () => {
//     navigator.serviceWorker.register(’/sw.js’)
//         .then(registration => console.log(‘SW registrado:’, registration))
//         .catch(error => console.log(‘SW error:’, error));
// });
}

// ===================================
// ANALYTICS (placeholder)
// ===================================
function trackEvent(category, action, label) {
// Aquí iría la integración con Google Analytics o similar
console.log(`Event tracked: ${category} - ${action} - ${label}`);
}

// Trackear clicks en CTA
document.querySelectorAll(’.btn-primary, .btn-secondary’).forEach(btn => {
btn.addEventListener(‘click’, () => {
trackEvent(‘CTA’, ‘click’, btn.textContent);
});
});
