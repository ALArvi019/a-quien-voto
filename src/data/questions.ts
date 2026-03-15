import type { Question } from '../types';

export const questions: Question[] = [
  // === INMIGRACIÓN (3) ===
  {
    id: 'inm-01',
    category: 'immigration',
    text: '¿Crees que los inmigrantes sin papeles que llevan años trabajando en España, sin antecedentes penales, deberían poder regularizar su situación?',
    explanation: 'Miles de personas trabajan en España sin permiso de residencia pero sin haber cometido ningún delito. Regularizar a estos inmigrantes "modélicos" significaría darles papeles para que puedan cotizar, pagar impuestos y acceder a sanidad.',
    partyPositions: { pp: 0, psoe: 1, vox: -1, podemos: 2, salf: -1 },
  },
  {
    id: 'inm-02',
    category: 'immigration',
    text: '¿Debería España exigir un contrato de trabajo o visado de trabajo en origen antes de permitir la entrada de inmigrantes no comunitarios?',
    explanation: 'Actualmente muchas personas llegan a España sin visado de trabajo y después intentan regularizarse. Esta medida significaría que solo podrían entrar quienes ya tengan una oferta de empleo verificada desde su país de origen, con controles más estrictos en frontera. Los defensores dicen que ordena la inmigración; los críticos, que ignora la realidad de quienes huyen de situaciones extremas y no pueden tramitar papeles desde su país.',
    partyPositions: { pp: 1, psoe: -1, vox: 2, podemos: -2, salf: 2 },
  },
  {
    id: 'inm-03',
    category: 'immigration',
    text: '¿Deberían los inmigrantes con permiso de residencia tener exactamente los mismos derechos sociales que los españoles desde el primer día?',
    explanation: 'Actualmente, los residentes legales ya tienen acceso a sanidad, educación y cotización a la Seguridad Social. Sin embargo, algunas prestaciones exigen tiempo mínimo: por ejemplo, el Ingreso Mínimo Vital requiere 1 año de residencia legal, y las pensiones no contributivas exigen residir en España. El debate es si estos plazos deberían eliminarse para igualar derechos desde el momento en que se obtiene la residencia, o si debería exigirse un periodo de cotización previo antes de acceder a prestaciones como desempleo, IMV o ayudas sociales.',
    partyPositions: { pp: -1, psoe: 1, vox: -2, podemos: 2, salf: -1 },
  },
  {
    id: 'inm-04',
    category: 'immigration',
    text: '¿Deberían ser deportados los inmigrantes en situación irregular que cometan delitos en España?',
    explanation: 'Se refiere a expulsar del país a personas sin permiso de residencia que sean condenadas por delitos, en lugar de cumplir la pena en una cárcel española y permanecer después en el país.',
    partyPositions: { pp: 2, psoe: 0, vox: 2, podemos: -1, salf: 2 },
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

  // === SANIDAD (3) ===
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
  {
    id: 'san-03',
    category: 'health',
    text: '¿Deberían los pacientes con enfermedades crónicas (diabetes, asma, enfermedades raras...) estar completamente exentos de copago en sus medicamentos?',
    explanation: 'Actualmente, los enfermos crónicos pagan un porcentaje de sus medicamentos según su renta. Una persona diabética puede gastar cientos de euros al año en insulina y otros fármacos. Se debate si el Estado debería cubrir el 100% del coste de estos tratamientos esenciales para la vida.',
    partyPositions: { pp: 0, psoe: 1, vox: 1, podemos: 2, salf: 1 },
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
  {
    id: 'viv-04',
    category: 'housing',
    text: '¿Debería poder desalojarse de forma inmediata a los okupas que ocupen la vivienda habitual de una persona o familia?',
    explanation: 'Se refiere a cuando alguien ocupa la casa donde una persona vive: su primera y única vivienda. Actualmente el proceso judicial puede tardar meses. Prácticamente todos los partidos coinciden en agilizarlo, aunque difieren en los plazos y mecanismos.',
    partyPositions: { pp: 2, psoe: 2, vox: 2, podemos: 0, salf: 2 },
  },
  {
    id: 'viv-04b',
    category: 'housing',
    text: '¿Debería aplicarse el mismo desalojo exprés cuando la vivienda okupada es una segunda residencia o un piso destinado al alquiler del que depende económicamente su propietario?',
    explanation: 'Hay propietarios que tienen un segundo piso para alquilar y esa renta es su medio de vida (por ejemplo, jubilados). También incluye viviendas vacacionales. El debate es si merecen la misma protección que una vivienda habitual o si al no ser primera residencia el proceso puede ser distinto.',
    partyPositions: { pp: 2, psoe: 1, vox: 2, podemos: -1, salf: 2 },
  },
  {
    id: 'viv-05',
    category: 'housing',
    text: '¿Deberían los fondos de inversión y grandes tenedores estar obligados a poner en alquiler social sus viviendas vacías, bajo penalización?',
    explanation: 'Algunos fondos de inversión ("fondos buitre") acumulan miles de viviendas vacías esperando que suban de precio, mientras hay familias sin hogar. Obligarles a alquilarlas a precio asequible o multarles podría liberar vivienda, aunque otros creen que vulnera la propiedad privada.',
    partyPositions: { pp: -1, psoe: 1, vox: -1, podemos: 2, salf: 1 },
  },
  {
    id: 'viv-06',
    category: 'housing',
    text: '¿Deberían los jóvenes que compran su primera vivienda estar exentos de pagar impuestos como el ITP o el IVA?',
    explanation: 'Al comprar un piso hay que pagar impuestos (ITP del 6-10% en segunda mano o IVA del 10% en obra nueva), lo que supone miles de euros extra. Para un joven que ya tiene dificultades para reunir la entrada, estos impuestos son una barrera más. Algunos partidos proponen eliminarlos o reducirlos drásticamente.',
    partyPositions: { pp: 1, psoe: 1, vox: 2, podemos: 1, salf: 1 },
  },
  {
    id: 'viv-07',
    category: 'housing',
    text: '¿Debería el Estado avalar el 100% de la hipoteca para jóvenes que compren su primera vivienda, eliminando la barrera de la entrada?',
    explanation: 'Los bancos suelen financiar solo el 80% del precio, así que un joven necesita tener ahorrados entre 30.000 y 50.000 euros antes de comprar. El ICO ya avala hasta el 20% restante para menores de 35 años, pero se debate si debería cubrir el 100% o ampliarse a más edad.',
    partyPositions: { pp: 1, psoe: 1, vox: 1, podemos: 0, salf: 1 },
  },

  // === SEGURIDAD Y JUSTICIA (6) ===
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
  {
    id: 'seg-03',
    category: 'security',
    text: '¿Deberían eliminarse los privilegios de ocio en las cárceles, como acceso a internet, instalaciones deportivas o actividades recreativas?',
    explanation: 'Las prisiones españolas ofrecen ciertos servicios de ocio a los internos (gimnasio, biblioteca, actividades deportivas). Algunos creen que la cárcel debe ser solo castigo, mientras que otros argumentan que estas actividades ayudan a la reinserción y reducen la conflictividad.',
    partyPositions: { pp: 1, psoe: -1, vox: 2, podemos: -2, salf: 2 },
  },
  {
    id: 'seg-04',
    category: 'security',
    text: '¿Deberían los presos realizar trabajos de utilidad pública como parte de su condena (limpiar bosques, mantener edificios públicos, construir infraestructuras)?',
    explanation: 'Se propone que los condenados contribuyan a la sociedad con trabajo productivo durante su estancia en prisión, en lugar de permanecer inactivos. Los críticos señalan que podría vulnerar derechos laborales y el marco constitucional.',
    partyPositions: { pp: 1, psoe: 0, vox: 2, podemos: -2, salf: 2 },
  },
  {
    id: 'seg-05',
    category: 'security',
    text: '¿Crees que los condenados por asesinato o agresión sexual deberían cumplir prisión permanente sin posibilidad real de reinserción?',
    explanation: 'España tiene la "prisión permanente revisable" para los delitos más graves, que permite revisar la condena tras 25-35 años. Se debate si debería eliminarse esa revisión para estos delitos, o si la reinserción debe seguir siendo un derecho constitucional.',
    partyPositions: { pp: 1, psoe: -1, vox: 2, podemos: -2, salf: 2 },
  },
  {
    id: 'seg-06',
    category: 'security',
    text: '¿Debería un delincuente reincidente con más de dos condenas, aunque sean por delitos menores, ser juzgado con penas propias de un delito grave?',
    explanation: 'Actualmente, los hurtos menores se castigan con penas leves aunque se cometan repetidamente. Algunos partidos proponen que la acumulación de delitos menores se trate con mayor severidad para disuadir la reincidencia.',
    partyPositions: { pp: 1, psoe: -1, vox: 2, podemos: -2, salf: 2 },
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

export const questionMap: Record<string, Question> = Object.fromEntries(
  questions.map((q) => [q.id, q])
);
