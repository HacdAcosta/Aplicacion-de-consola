const readlineSync = require('readline-sync');
const fs = require('fs');
const path = require('path');

// Archivo de registro de actividad
const logFile = 'activity.log';

// Función para mostrar el menú principal
function showMainMenu() {
  console.log('Bienvenido a la Aplicación de Consola');
  console.log('Selecciona una opción:');
  console.log('1. Crear archivo');
  console.log('2. Leer archivo');
  console.log('3. Actualizar archivo');
  console.log('4. Eliminar archivo');
  console.log('5. Crear directorio');
  console.log('6. Listar contenido de directorio');
  console.log('7. Copiar archivo');
  console.log('8. Mover archivo');
  console.log('9. Buscar archivo');
  console.log('10. Ver registro de actividad');
  console.log('11. Salir');
}

// Función para manejar la opción seleccionada
function handleOption(option) {
  switch (option) {
    case 1:
      createFile();
      break;
    case 2:
      readFile();
      break;
    case 3:
      updateFile();
      break;
    case 4:
      deleteFile();
      break;
    case 5:
      createDirectory();
      break;
    case 6:
      listDirectoryContent();
      break;
    case 7:
      copyFile();
      break;
    case 8:
      moveFile();
      break;
    case 9:
      searchFiles();
      break;
    case 10:
      viewActivityLog();
      break;
    case 11:
      console.log('Saliendo de la aplicación...');
      break;
    default:
      console.log('Opción inválida. Intenta de nuevo.');
  }
}

// Función para crear un archivo
function createFile() {
  const fileName = readlineSync.question('Ingresa el nombre del archivo: ');
  const fileContent = readlineSync.question('Ingresa el contenido del archivo: ');

  fs.writeFileSync(path.join(__dirname, fileName), fileContent);
  console.log('Archivo creado exitosamente.');
  logActivity(`Archivo "${fileName}" creado.`);
}

// Función para leer un archivo
function readFile() {
  const fileName = readlineSync.question('Ingresa el nombre del archivo: ');
  const filePath = path.join(__dirname, fileName);

  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    console.log('Contenido del archivo:', fileContent);
    logActivity(`Archivo "${fileName}" leído.`);
  } else {
    console.log('El archivo no existe.');
  }
}

// Función para actualizar un archivo
function updateFile() {
  const fileName = readlineSync.question('Ingresa el nombre del archivo: ');
  const filePath = path.join(__dirname, fileName);

  if (fs.existsSync(filePath)) {
    const newContent = readlineSync.question('Ingresa el nuevo contenido del archivo: ');
    fs.writeFileSync(filePath, newContent);
    console.log('Archivo actualizado exitosamente.');
    logActivity(`Archivo "${fileName}" actualizado.`);
  } else {
    console.log('El archivo no existe.');
  }
}

// Función para eliminar un archivo
function deleteFile() {
  const fileName = readlineSync.question('Ingresa el nombre del archivo: ');
  const filePath = path.join(__dirname, fileName);

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log('Archivo eliminado exitosamente.');
    logActivity(`Archivo "${fileName}" eliminado.`);
  } else {
    console.log('El archivo no existe.');
  }
}

// Función para crear un directorio
function createDirectory() {
  const directoryName = readlineSync.question('Ingresa el nombre del directorio: ');
  const directoryPath = path.join(__dirname, directoryName);

  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath);
    console.log('Directorio creado exitosamente.');
    logActivity(`Directorio "${directoryName}" creado.`);
  } else {
    console.log('El directorio ya existe.');
  }
}

// Función para listar el contenido de un directorio
function listDirectoryContent() {
  const directoryName = readlineSync.question('Ingresa el nombre del directorio: ');
  const directoryPath = path.join(__dirname, directoryName);

  if (fs.existsSync(directoryPath)) {
    const files = fs.readdirSync(directoryPath);
    console.log('Contenido del directorio:');
    files.forEach((file) => {
      console.log(`- ${file}`);
    });
    logActivity(`Contenido del directorio "${directoryName}" listado.`);
  } else {
    console.log('El directorio no existe.');
  }
}

// Función para copiar un archivo
function copyFile() {
  const sourceFileName = readlineSync.question('Ingresa el nombre del archivo a copiar: ');
  const sourcePath = path.join(__dirname, sourceFileName);
  const destinationFileName = readlineSync.question('Ingresa el nombre del archivo de destino: ');
  const destinationPath = path.join(__dirname, destinationFileName);

  if (fs.existsSync(sourcePath)) {
    const fileContent = fs.readFileSync(sourcePath, 'utf8');
    fs.writeFileSync(destinationPath, fileContent);
    console.log('Archivo copiado exitosamente.');
    logActivity(`Archivo "${sourceFileName}" copiado a "${destinationFileName}".`);
  } else {
    console.log('El archivo de origen no existe.');
  }
}

// Función para mover un archivo
function moveFile() {
  const sourceFileName = readlineSync.question('Ingresa el nombre del archivo a mover: ');
  const sourcePath = path.join(__dirname, sourceFileName);
  const destinationFileName = readlineSync.question('Ingresa el nombre del archivo de destino: ');
  const destinationPath = path.join(__dirname, destinationFileName);

  if (fs.existsSync(sourcePath)) {
    fs.renameSync(sourcePath, destinationPath);
    console.log('Archivo movido exitosamente.');
    logActivity(`Archivo "${sourceFileName}" movido a "${destinationFileName}".`);
  } else {
    console.log('El archivo de origen no existe.');
  }
}

// Función para buscar archivos
function searchFiles() {
  const searchTerm = readlineSync.question('Ingresa el término de búsqueda: ');
  const files = fs.readdirSync(__dirname);
  const matchingFiles = files.filter((file) => file.includes(searchTerm));

  if (matchingFiles.length > 0) {
    console.log('Archivos encontrados:');
    matchingFiles.forEach((file) => {
      console.log(`- ${file}`);
    });
    logActivity(`Búsqueda de archivos con término "${searchTerm}" realizada.`);
  } else {
    console.log('No se encontraron archivos que coincidan con el término de búsqueda.');
  }
}

// Función para ver el registro de actividad
function viewActivityLog() {
    const logFilePath = path.join(__dirname, logFile);
  
    if (fs.existsSync(logFilePath)) {
      const logContent = fs.readFileSync(logFilePath, 'utf8');
      console.log('Registro de actividad:');
      console.log(logContent);
    } else {
      console.log('No hay registro de actividad disponible.');
    }
  }
  
  // Función para registrar la actividad
  function logActivity(activity) {
    const logFilePath = path.join(__dirname, logFile);
    const timestamp = new Date().toLocaleString();
    const logEntry = `[${timestamp}] ${activity}\n`;
  
    fs.appendFileSync(logFilePath, logEntry);
  }
  
  // Bucle principal de la aplicación
  console.log('Bienvenido a la Aplicación de Consola');
  console.log('Esta aplicación te permite realizar operaciones básicas con archivos y directorios.');
  console.log('Recuerda que todas las acciones se registrarán en un archivo de log.');
  
  while (true) {
    showMainMenu();
    const option = readlineSync.question('Ingresa tu selección: ');
    handleOption(parseInt(option));
  
    if (option === '11') {
      break;
    }
  }
  
