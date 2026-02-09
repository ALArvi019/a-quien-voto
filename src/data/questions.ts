import type { Question } from '../types';

export const questions: Question[] = [
  // === INMIGRACIÓN (3) ===
  {
    id: 'inm-01',
    category: 'immigration',
    text: '¿Crees que los inmigrantes sin papeles deberían poder regularizar su situación si llevan años trabajando en España?',
    explanation: 'Actualmente, miles de personas trabajan en España sin permiso de residencia. Regularizarlos significaría darles papeles para que puedan cotizar, pagar impuestos y acceder a sanidad.',
    partyPositions: { pp: -1, psoe: 1, vox: -2, podemos: 2, salf: -2 },
  },
  {
    id: 'inm-02',
    category: 'immigration',
    text: '¿Debería España poner límites más estrictos a la entrada de inmigrantes?',
    explanation: 'Se refiere a endurecer los controles fronterizos, reducir visados y dificultar la llegada de personas de otros países, especialmente fuera de la UE.',
    partyPositions: { pp: 1, psoe: -1, vox: 2, podemos: -2, salf: 2 },
  },
  {
    id: 'inm-03',
    category: 'immigration',
    text: '¿Deberían los inmigrantes con permiso de residencia tener los mismos derechos sociales que los españoles (sanidad, ayudas, educación)?',
    explanation: 'Algunos partidos defienden que el acceso a servicios públicos sea igual para todos los residentes legales, mientras que otros creen que debería priorizarse a los nacionales.',
    partyPositions: { pp: 0, psoe: 1, vox: -2, podemos: 2, salf: -1 },
  },

  // === ECONOMÍA Y FISCALIDAD (3) ===
  {
    id: 'eco-01',
    category: 'economy',
    text: '¿Crees que los ricos deberían pagar muchos más impuestos que ahora?',
    explanation: 'Subir impuestos a las grandes fortunas y rentas altas para financiar servicios públicos. Quienes se oponen argumentan que esto desincentiva la inversión y la creación de empleo.',
    partyPositions: { pp: -2, psoe: 1, vox: -1, podemos: 2, salf: 0 },
  },
  {
    id: 'eco-02',
    category: 'economy',
    text: '¿Debería el gobierno bajar los impuestos a las empresas para que creen más empleo?',
    explanation: 'Reducir el Impuesto de Sociedades para atraer inversión. Los críticos dicen que esto beneficia a grandes corporaciones sin garantizar más empleo.',
    partyPositions: { pp: 2, psoe: -1, vox: 1, podemos: -2, salf: 0 },
  },
  {
    id: 'eco-03',
    category: 'economy',
    text: '¿Debería subirse el salario mínimo por encima de los 1.200 euros al mes?',
    explanation: 'El salario mínimo interprofesional (SMI) es lo mínimo que puede cobrar un trabajador. Subirlo mejora la vida de los trabajadores pero algunos argumentan que puede destruir empleo en pequeñas empresas.',
    partyPositions: { pp: -1, psoe: 1, vox: -1, podemos: 2, salf: 0 },
  },

  // === SANIDAD (2) ===
  {
    id: 'san-01',
    category: 'health',
    text: '¿Crees que la sanidad debería ser 100% pública y no permitir la gestión privada de hospitales públicos?',
    explanation: 'Algunos hospitales públicos están gestionados por empresas privadas. Hay quien defiende que toda la gestión sea pública para garantizar la calidad, y quien cree que la gestión privada es más eficiente.',
    partyPositions: { pp: -1, psoe: 0, vox: -1, podemos: 2, salf: 0 },
  },
  {
    id: 'san-02',
    category: 'health',
    text: '¿Debería aumentarse mucho la inversión pública en salud mental?',
    explanation: 'Las listas de espera para psicólogos en la sanidad pública son de meses. Aumentar la inversión significaría más profesionales y acceso más rápido a terapia.',
    partyPositions: { pp: 0, psoe: 1, vox: 0, podemos: 2, salf: 1 },
  },

  // === VIVIENDA (3) ===
  {
    id: 'viv-01',
    category: 'housing',
    text: '¿Debería el gobierno limitar el precio de los alquileres por ley?',
    explanation: 'Poner un tope máximo a lo que un propietario puede cobrar de alquiler. Los defensores dicen que protege a los inquilinos; los críticos, que reduce la oferta de pisos en alquiler.',
    partyPositions: { pp: -2, psoe: 1, vox: -2, podemos: 2, salf: -1 },
  },
  {
    id: 'viv-02',
    category: 'housing',
    text: '¿Crees que debería construirse mucha más vivienda pública para alquiler asequible?',
    explanation: 'Vivienda pública son pisos propiedad del Estado que se alquilan a precios bajos. España tiene muy poca comparada con otros países europeos.',
    partyPositions: { pp: 1, psoe: 2, vox: 0, podemos: 2, salf: 1 },
  },
  {
    id: 'viv-03',
    category: 'housing',
    text: '¿Deberían prohibirse los pisos turísticos (tipo Airbnb) en zonas con problemas de vivienda?',
    explanation: 'Los pisos turísticos reducen la oferta de alquiler para residentes y suben los precios. Prohibirlos podría abaratar el alquiler pero afectaría al turismo y a propietarios.',
    partyPositions: { pp: -1, psoe: 1, vox: -1, podemos: 2, salf: 0 },
  },

  // === SEGURIDAD Y JUSTICIA (2) ===
  {
    id: 'seg-01',
    category: 'security',
    text: '¿Deberían endurecerse las penas de cárcel para delitos graves?',
    explanation: 'Aumentar los años de prisión para delitos como agresiones sexuales, terrorismo o corrupción. Quienes se oponen argumentan que la reinserción es más efectiva que el castigo.',
    partyPositions: { pp: 1, psoe: 0, vox: 2, podemos: -1, salf: 2 },
  },
  {
    id: 'seg-02',
    category: 'security',
    text: '¿Crees que la policía debería tener más medios y presupuesto?',
    explanation: 'Invertir más en fuerzas de seguridad: más agentes, mejor equipamiento y tecnología. Los críticos dicen que el problema no es de medios sino de enfoque.',
    partyPositions: { pp: 2, psoe: 0, vox: 2, podemos: -1, salf: 1 },
  },

  // === EDUCACIÓN (2) ===
  {
    id: 'edu-01',
    category: 'education',
    text: '¿Debería el gobierno dejar de financiar colegios concertados (privados con dinero público)?',
    explanation: 'Los colegios concertados son privados pero reciben fondos del Estado. Algunos creen que ese dinero debería ir solo a la escuela pública; otros, que los padres deben poder elegir.',
    partyPositions: { pp: -2, psoe: -1, vox: -1, podemos: 2, salf: 0 },
  },
  {
    id: 'edu-02',
    category: 'education',
    text: '¿Crees que la universidad pública debería ser gratuita para todos?',
    explanation: 'Eliminar las tasas universitarias para que cualquier persona pueda estudiar una carrera sin coste. Actualmente cuestan entre 700 y 2.000 euros al año según la comunidad.',
    partyPositions: { pp: -1, psoe: 0, vox: -1, podemos: 2, salf: 0 },
  },

  // === MEDIO AMBIENTE Y ENERGÍA (3) ===
  {
    id: 'env-01',
    category: 'environment',
    text: '¿Debería España prohibir la venta de coches de gasolina y diésel antes de 2035?',
    explanation: 'La UE planea prohibir la venta de coches nuevos de combustión en 2035. Algunos partidos quieren adelantar la fecha; otros creen que es precipitado y perjudica a la industria.',
    partyPositions: { pp: -1, psoe: 1, vox: -2, podemos: 2, salf: -1 },
  },
  {
    id: 'env-02',
    category: 'environment',
    text: '¿Crees que la energía nuclear debería seguir funcionando en España?',
    explanation: 'España tiene centrales nucleares que producen electricidad sin CO2. Algunos quieren mantenerlas o ampliarlas; otros prefieren cerrarlas por los riesgos y apostar solo por renovables.',
    partyPositions: { pp: 2, psoe: -1, vox: 2, podemos: -2, salf: 1 },
  },
  {
    id: 'env-03',
    category: 'environment',
    text: '¿Debería el gobierno invertir mucho más en energías renovables aunque suba la factura de la luz a corto plazo?',
    explanation: 'Acelerar la transición a solar, eólica, etc. requiere inversión que podría encarecer la luz temporalmente, pero a largo plazo la abarataría y reduciría la contaminación.',
    partyPositions: { pp: 0, psoe: 1, vox: -1, podemos: 2, salf: 0 },
  },

  // === DERECHOS SOCIALES (3) ===
  {
    id: 'soc-01',
    category: 'social_rights',
    text: '¿Debería ampliarse el derecho al aborto y garantizar su acceso en la sanidad pública de todas las comunidades?',
    explanation: 'Actualmente el aborto es legal en España, pero en algunas zonas es difícil acceder al servicio en la sanidad pública. Se debate si debe garantizarse en todos los hospitales públicos.',
    partyPositions: { pp: -1, psoe: 2, vox: -2, podemos: 2, salf: -1 },
  },
  {
    id: 'soc-02',
    category: 'social_rights',
    text: '¿Crees que España debería legalizar la eutanasia en más supuestos de los actuales?',
    explanation: 'La eutanasia es legal en España desde 2021 en casos de enfermedad grave e incurable. Se debate si debería ampliarse a más situaciones como enfermedades mentales graves.',
    partyPositions: { pp: -1, psoe: 1, vox: -2, podemos: 2, salf: -1 },
  },
  {
    id: 'soc-03',
    category: 'social_rights',
    text: '¿Deberían protegerse más los derechos de las personas LGTBI con leyes específicas?',
    explanation: 'Leyes que prohíban la discriminación por orientación sexual o identidad de género, y que protejan a estas personas en ámbitos como el trabajo, la sanidad y la educación.',
    partyPositions: { pp: 0, psoe: 2, vox: -2, podemos: 2, salf: -1 },
  },

  // === MODELO TERRITORIAL (2) ===
  {
    id: 'ter-01',
    category: 'territorial',
    text: '¿Crees que las comunidades autónomas tienen demasiado poder y debería centralizarse más la gestión del Estado?',
    explanation: 'España está organizada en 17 comunidades autónomas con competencias propias (educación, sanidad, etc.). Algunos creen que esto es ineficiente y debería haber más control central.',
    partyPositions: { pp: 1, psoe: -1, vox: 2, podemos: -1, salf: 1 },
  },
  {
    id: 'ter-02',
    category: 'territorial',
    text: '¿Debería permitirse un referéndum de autodeterminación en Cataluña o el País Vasco?',
    explanation: 'Un referéndum donde los ciudadanos de esa comunidad voten si quieren ser independientes. La Constitución actual no lo permite.',
    partyPositions: { pp: -2, psoe: -1, vox: -2, podemos: 1, salf: -2 },
  },

  // === TRANSPARENCIA Y REGENERACIÓN (2) ===
  {
    id: 'tra-01',
    category: 'transparency',
    text: '¿Deberían los políticos condenados por corrupción quedar inhabilitados de por vida para cargos públicos?',
    explanation: 'Actualmente, un político condenado por corrupción puede volver a presentarse a elecciones después de cumplir su pena. Se debate si la inhabilitación debería ser permanente.',
    partyPositions: { pp: 0, psoe: 0, vox: 1, podemos: 2, salf: 2 },
  },
  {
    id: 'tra-02',
    category: 'transparency',
    text: '¿Crees que los sueldos y patrimonio de todos los políticos deberían ser públicos y accesibles para cualquier ciudadano?',
    explanation: 'Obligar a que todos los cargos públicos publiquen cuánto cobran, qué propiedades tienen y sus declaraciones de la renta, para que cualquiera pueda consultarlos.',
    partyPositions: { pp: 0, psoe: 0, vox: 1, podemos: 2, salf: 2 },
  },
];
