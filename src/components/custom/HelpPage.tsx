import React from "react";
import { Container, Nav, Tab, Row, Col } from "react-bootstrap";

const HelpPage = () => {
  return (
    <Container className="mt-4">
      <h1>Dokumentacja dla użytkowników WayWithUs</h1>
      <Tab.Container id="help-tabs" defaultActiveKey="gettingStarted">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="gettingStarted">Pierwsze kroki</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="searchTrips">Wyszukiwanie podróży</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="createTrip">Tworzenie podróży</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="myTrips">Moje podróże</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="chat">Czat z uczestnikami</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="features">Przydatne funkcje</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="faq">Rozwiązywanie problemów</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="safety">Porady bezpieczeństwa</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="tips">Przydatne porady</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="scenarios">Scenariusze użycia</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="feedback">Opinie użytkowników</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="gettingStarted">
                <h2>Pierwsze kroki</h2>
                <p>WayWithUs to aplikacja, która pomaga tworzyć unikalne podróże i znajdować towarzyszy podróży o podobnych zainteresowaniach. Możesz samodzielnie dostosować wszystkie parametry podróży lub skorzystać z pomocy sztucznej inteligencji, komunikować się z uczestnikami za pomocą wbudowanego czatu i dzielić się swoimi planami z przyjaciółmi.</p>
                <h3>Jak zarejestrować się i zalogować do aplikacji</h3>
                <ol>
                  <li>Otwórz aplikację WayWithUs.</li>
                  <li>Kliknij „Zaloguj się”.</li>
                  <li>Kliknij przycisk „Utwórz konto”.</li>
                  <li>Wybierz sposób rejestracji: e-mail lub Google.</li>
                  <li>Wypełnij wymagane dane i potwierdź rejestrację.</li>
                  <li>Aby się zalogować, użyj zarejestrowanych danych.</li>
                </ol>
                <h3>Przewodnik po interfejsie</h3>
                <ul>
                  <li>Strona główna: strona powitalna z opisem funkcji aplikacji.</li>
                  <li>Wyszukiwanie podróży: wyszukiwanie podróży według określonych kryteriów lub przeglądanie wszystkich dostępnych podróży.</li>
                  <li>Tworzenie podróży: kreator, w którym można stworzyć własną podróż.</li>
                  <li>Moje podróże: lista wszystkich podróży, w których uczestniczy użytkownik.</li>
                  <li>Tworzenie podróży z pomocą AI: automatycznie generuje podróż przy pomocy AI.</li>
                  <li>Powiadomienia: lista wszystkich powiadomień użytkownika.</li>
                  <li>Avatar użytkownika: zdjęcie, imię i nazwisko użytkownika, prowadzi do ustawień, gdzie można się wylogować i dostosować aplikację.</li>
                </ul>
              </Tab.Pane>
              <Tab.Pane eventKey="searchTrips">
                <h2>Wyszukiwanie podróży</h2>
                <h3>Jak znaleźć nową podróż</h3>
                <ol>
                  <li>Kliknij przycisk „Szukaj” na stronie głównej.</li>
                  <li>Pojawi się lista wszystkich dostępnych podróży.</li>
                  <li>Możesz znaleźć określoną podróż, wpisując parametry wyszukiwania, takie jak:
                    <ul>
                      <li>ID podróży.</li>
                      <li>Daty podróży.</li>
                      <li>Miejsce docelowe.</li>
                      <li>Budżet.</li>
                      <li>Liczba uczestników.</li>
                    </ul>
                  </li>
                  <li>Wybraną podróż możesz zobaczyć szczegółowo, klikając przycisk „Szczegóły”.</li>
                  <li>Aby dołączyć do podróży, kliknij przycisk „Dołącz”.</li>
                </ol>
              </Tab.Pane>
              <Tab.Pane eventKey="createTrip">
                <h2>Tworzenie podróży</h2>
                <h3>Jak stworzyć nową podróż</h3>
                <ol>
                  <li>Kliknij przycisk „Utwórz” na stronie głównej.</li>
                  <li>Wypełnij podstawowe parametry:
                    <ul>
                      <li>Nazwa podróży.</li>
                      <li>Daty podróży.</li>
                      <li>Budżet.</li>
                      <li>Liczba uczestników.</li>
                      <li>Miasta do odwiedzenia.</li>
                      <li>Transport.</li>
                      <li>Noclegi.</li>
                      <li>Ciekawe miejsca.</li>
                    </ul>
                  </li>
                  <li>Dodaj opis, aby uczestnicy lepiej zrozumieli cel podróży.</li>
                  <li>Kliknij „Zapisz”.</li>
                </ol>
                <h3>Dostosowywanie parametrów</h3>
                <ul>
                  <li><strong>Zmiana daty i miejsca docelowego:</strong>
                    <ol>
                      <li>Otwórz stronę podróży.</li>
                      <li>Kliknij „Edytuj”.</li>
                      <li>Wprowadź zmiany i kliknij „Zapisz”.</li>
                    </ol>
                  </li>
                  <li><strong>Dodawanie uczestników:</strong>
                    <ol>
                      <li>Przejdź na stronę podróży.</li>
                      <li>Kliknij „Kopiuj ID”.</li>
                      <li>Wyślij ID podróży innemu uczestnikowi.</li>
                    </ol>
                  </li>
                </ul>
                <h3>Jak stworzyć podróż z pomocą AI</h3>
                <ol>
                  <li>Kliknij przycisk „Stwórz podróż z pomocą AI” na stronie głównej.</li>
                </ol>
              </Tab.Pane>
              <Tab.Pane eventKey="myTrips">
                <h2>Moje podróże</h2>
                <h3>Jak zobaczyć listę wszystkich podróży, w których uczestniczę</h3>
                <ol>
                  <li>Kliknij przycisk „Moje podróże” na stronie głównej.</li>
                </ol>
                <h3>Jak opuścić podróż</h3>
                <ol>
                  <li>Kliknij przycisk „Moje podróże” na stronie głównej.</li>
                  <li>Przejdź do podróży, którą chcesz opuścić.</li>
                  <li>Kliknij przycisk „Opuść”.</li>
                </ol>
              </Tab.Pane>
              <Tab.Pane eventKey="chat">
                <h2>Czat z uczestnikami</h2>
                <h3>Jak korzystać z czatu</h3>
                <ol>
                  <li>Przejdź do zakładki „Moje podróże”.</li>
                  <li>Wybierz odpowiednią podróż.</li>
                  <li>Kliknij przycisk „Czat”.</li>
                  <li>Wysyłaj wiadomości.</li>
                </ol>
                <h3>Porady dotyczące bezpiecznej komunikacji</h3>
                <ul>
                  <li>Nigdy nie udostępniaj danych osobowych (dane paszportowe, karty bankowe).</li>
                  <li>Używaj wbudowanych funkcji czatu do komunikacji.</li>
                </ul>
              </Tab.Pane>
              <Tab.Pane eventKey="features">
                <h2>Przydatne funkcje</h2>
                <h3>Integracja z Google Maps</h3>
                <ul>
                  <li>Utwórz trasę i udostępnij ją uczestnikom.</li>
                  <li>Aby to zrobić, przejdź do podróży, kliknij przycisk „Trasa”.</li>
                  <li>Trasa może być udostępniana za pomocą wbudowanych funkcji Google Maps.</li>
                </ul>
                <h3>Powiadomienia</h3>
                <ul>
                  <li>Powiadomienia dotyczą takich zdarzeń, jak dodanie nowego uczestnika, nowe wiadomości w czacie, zmiany w podróży.</li>
                </ul>
              </Tab.Pane>
              <Tab.Pane eventKey="faq">
                <h2>Rozwiązywanie problemów</h2>
                <h3>FAQ</h3>
                <ul>
                  <li><strong>Jak zmienić datę podróży?</strong> Przejdź do strony podróży, kliknij „Edytuj”, wprowadź zmiany i zapisz je.</li>
                  <li><strong>Dlaczego nie mogę dodać uczestnika?</strong> Sprawdź, czy limit uczestników dla tej podróży nie został osiągnięty.</li>
                  <li><strong>Co zrobić, jeśli aplikacja nie działa?</strong> Odśwież stronę. Jeśli problem nadal występuje, skontaktuj się z pomocą techniczną.</li>
                </ul>
                <h3>Jak skontaktować się z pomocą techniczną</h3>
                <ul>
                  <li>Wszelkie błędy prosimy zgłaszać na e-mail support@waywithus.com.</li>
                </ul>
              </Tab.Pane>
              <Tab.Pane eventKey="safety">
                <h2>Porady bezpieczeństwa</h2>
                <ul>
                  <li>Spotykaj się z towarzyszami podróży w miejscach publicznych, jeśli to pierwsze spotkanie.</li>
                </ul>
              </Tab.Pane>
              <Tab.Pane eventKey="tips">
                <h2>Przydatne porady dotyczące tworzenia podróży</h2>
                <ul>
                  <li>Planuj trasę z wyprzedzeniem, aby maksymalnie wykorzystać dostępny czas.</li>
                  <li>Uwzględniaj sezonowość: niektóre miejsca mogą być zamknięte w określonych porach roku.</li>
                  <li>Twórz listę ciekawych miejsc i wydarzeń, które warto odwiedzić.</li>
                  <li>Nie zapomnij o czasie na odpoczynek i nieprzewidziane zmiany.</li>
                </ul>
              </Tab.Pane>
              <Tab.Pane eventKey="scenarios">
                <h2>Scenariusze użycia</h2>
                <h3>Scenariusz 1: Chcę znaleźć towarzyszy podróży do Paryża</h3>
                <ol>
                  <li>Użyj funkcji wyszukiwania podróży i wpisz „Paryż” jako miejsce docelowe.</li>
                  <li>Wybierz podróż z odpowiednimi datami i budżetem.</li>
                  <li>Dołącz do grupy, klikając przycisk „Dołącz”.</li>
                </ol>
                <h3>Scenariusz 2: Potrzebuję stworzyć budżetową podróż z przyjaciółmi</h3>
                <ol>
                  <li>Przejdź do kreatora podróży.</li>
                  <li>Ustaw budżet i wybierz tanie opcje transportu i noclegów.</li>
                  <li>Zaproś przyjaciół, wysyłając im ID podróży.</li>
                </ol>
                <h3>Scenariusz 3: Szukam gotowej podróży, aby po prostu do niej dołączyć</h3>
                <ol>
                  <li>Przejdź do sekcji wyszukiwania podróży.</li>
                  <li>Przeglądaj dostępne podróże bez filtrów.</li>
                  <li>Dołącz do wybranej podróży.</li>
                </ol>
              </Tab.Pane>
              <Tab.Pane eventKey="feedback">
                <h2>Opinie użytkowników i sugestie</h2>
                <p>Zawsze cieszymy się z Twoich sugestii! Jeśli masz pomysły na ulepszenie aplikacji lub chcesz zaproponować nową funkcję, napisz do nas na feedback@waywithus.com. Twoja opinia pomaga nam się rozwijać!</p>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default HelpPage;
