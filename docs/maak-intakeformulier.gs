/**
 * Maakt het Italiaanse intakeformulier voor verhuurders aan in Google Formulieren,
 * plus een gekoppelde spreadsheet waarin de antwoorden binnenkomen.
 *
 * Gebruik: plak dit in script.google.com (Nieuw project), klik op "Uitvoeren"
 * en geef toestemming. Daarna staan de links onder "Uitvoeringslogboek".
 */
function maakIntakeformulier() {
  var form = FormApp.create('Guida digitale per gli ospiti – Questionario');
  form.setDescription(
    'Grazie! Con queste informazioni preparo la guida digitale per i vostri ospiti, ' +
    'in italiano, inglese, olandese e tedesco. Potete scrivere tutto in italiano: alle traduzioni penso io.\n\n' +
    'Tempo di compilazione: circa 10 minuti.\n\n' +
    'Importante: la guida è una pagina web accessibile con un link. Non inserite dati personali ' +
    'degli ospiti, codici delle carte o altre informazioni riservate.\n\n' +
    'Sam – Sardegna Autentica'
  );
  form.setCollectEmail(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Grazie! Vi contatto entro pochi giorni con la prima versione della guida. ' +
    'Se volete aggiungere una foto della casa, inviatela su WhatsApp.'
  );

  // --- La casa ---
  form.addSectionHeaderItem().setTitle('La casa');
  form.addTextItem().setTitle('Nome della casa').setHelpText('Come appare su Airbnb o Booking').setRequired(true);
  form.addTextItem().setTitle('Indirizzo completo').setRequired(true);
  form.addTextItem().setTitle('Link Google Maps della casa').setHelpText('Facoltativo. In Google Maps: Condividi → Copia link');
  form.addCheckboxItem().setTitle('Zona')
    .setHelpText('Serve per mostrare le spiagge e i consigli giusti. Potete sceglierne più di una.')
    .setChoiceValues(['Cagliari e Poetto', 'Quartu – Villasimius', 'Costa Rei – Muravera', 'Pula – Chia – Teulada', 'Sulcis – Iglesiente', 'Oristano – Sinis', 'Entroterra'])
    .showOtherOption(true)
    .setRequired(true);
  form.addParagraphTextItem().setTitle('Messaggio di benvenuto per gli ospiti')
    .setHelpText('2–3 frasi. Es. "Benvenuti! Siamo felici di ospitarvi nel cuore di Cagliari…"');

  // --- Contatto ---
  form.addPageBreakItem().setTitle('Contatto');
  form.addTextItem().setTitle('Il vostro nome, come lo vedranno gli ospiti').setRequired(true);
  form.addTextItem().setTitle('Numero di telefono / WhatsApp per gli ospiti').setHelpText('Con prefisso, es. +39 333 123 4567').setRequired(true);
  form.addTextItem().setTitle('Orari in cui siete raggiungibili').setHelpText('Es. 08:00–21:00');

  // --- Arrivo e partenza ---
  form.addPageBreakItem().setTitle('Arrivo e partenza');
  form.addTextItem().setTitle('Orario di check-in').setHelpText('Es. dalle 15:00').setRequired(true);
  form.addTextItem().setTitle('Orario di check-out').setHelpText('Es. entro le 10:30').setRequired(true);
  form.addParagraphTextItem().setTitle('Come si entra?')
    .setHelpText('Descrivete i passaggi, uno per riga: cassetta delle chiavi, citofono, piano, ascensore… ' +
                 'Non scrivete qui il codice della cassetta: lo comunicate voi agli ospiti.')
    .setRequired(true);
  form.addParagraphTextItem().setTitle('Dove si parcheggia?').setHelpText('Strisce blu, garage, parcheggio gratuito vicino…');
  form.addParagraphTextItem().setTitle("Come si arriva dall'aeroporto o dal porto?").setHelpText('Facoltativo');

  // --- Wifi ---
  form.addPageBreakItem().setTitle('Wifi');
  form.addTextItem().setTitle('Nome della rete wifi');
  form.addTextItem().setTitle('Password del wifi');

  // --- Regole ---
  form.addPageBreakItem().setTitle('Regole della casa');
  form.addParagraphTextItem().setTitle('Le vostre regole')
    .setHelpText('Una per riga. Es. orari di silenzio, fumo, animali, raccolta differenziata, cosa fare alla partenza.');

  // --- Consigli ---
  form.addPageBreakItem().setTitle('I vostri consigli');
  form.addParagraphTextItem().setTitle('Posti che consigliate voi')
    .setHelpText('Bar, panificio, spiaggia, belvedere… Per ognuno: nome, perché vi piace e, se lo avete, il link di Google Maps.');

  // --- Servizi extra ---
  form.addPageBreakItem().setTitle('Servizi extra');
  form.addParagraphTextItem().setTitle('Offrite servizi a pagamento?')
    .setHelpText('Facoltativo. Es. check-in anticipato, spesa di benvenuto, transfer, kit spiaggia. Per ognuno: nome, breve descrizione, prezzo.');

  // --- Lingue e conferma ---
  form.addPageBreakItem().setTitle('Lingue e conferma');
  form.addCheckboxItem().setTitle('In quali lingue volete la guida?')
    .setChoiceValues(['Italiano', 'English', 'Nederlands', 'Deutsch'])
    .setRequired(true);
  form.addCheckboxItem().setTitle('Conferma')
    .setChoiceValues(["Ho capito che la guida è una pagina web accessibile con un link e che non contiene dati personali degli ospiti."])
    .setRequired(true);

  // Antwoorden naar een spreadsheet
  var ss = SpreadsheetApp.create('Guida digitale – Risposte');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());

  Logger.log('Link voor verhuurders: ' + form.getPublishedUrl());
  Logger.log('Formulier bewerken: ' + form.getEditUrl());
  Logger.log('Antwoorden (spreadsheet): ' + ss.getUrl());
}
