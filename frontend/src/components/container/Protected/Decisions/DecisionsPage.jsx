import { useEffect, useState } from "react";
import api from "@services/api";
import "@assets/css/container/protected/DecisionPage.css";
import CommentSection from "@components/header/CommentSection";
import { useLocation } from "react-router-dom";
import Spinner from "@components/Spinner";

function DecisionsPage() {
  const [decisions, setDecisions] = useState(null);
  const [impacted, setImpacted] = useState();
  const [expert, setExpert] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [comments, setComments] = useState();
  const [descriptionData, setDescriptionData] = useState();
  const [contextData, setContextData] = useState();
  const [utilityData, setUtilityData] = useState();
  const [advantagesData, setAdvantagesData] = useState();
  const [inconvenientsData, setInconvenientsData] = useState();
  const [modifDescription, setModifDescription] = useState(false);
  const [modifContext, setModifContext] = useState(false);
  const [modifUtility, setModifUtility] = useState(false);
  const [modifAdvantages, setModifAdvantages] = useState(false);
  const [modifInconvenients, setModifInconvenients] = useState(false);

  const URLParam = useLocation().search;
  const id = new URLSearchParams(URLParam).get("id")
    ? new URLSearchParams(URLParam).get("id")
    : "";

  useEffect(() => {
    const getAllApis = async () => {
      // get the decision
      const callDecisions = await api.apigetmysql(
        `${import.meta.env.VITE_BACKEND_URL}/decisions/${id}`
      );
      setDecisions(callDecisions);
      setImpacted(JSON.parse(callDecisions.content).impacted);
      setExpert(JSON.parse(callDecisions.content).experts);
      setIsLoaded(true);
    };
    getAllApis();
  }, []);

  useEffect(() => {
    const updateDecisionData = async () => {
      const getDecision = await api.apigetmysql(
        `${import.meta.env.VITE_BACKEND_URL}/decisions/${id}`
      );
      setDescriptionData(getDecision.description);
      setContextData(getDecision.context);
      setUtilityData(getDecision.utility);
      setAdvantagesData(getDecision.pros);
      setInconvenientsData(getDecision.cons);
    };
    updateDecisionData(); // lance la fonction getDecisionData
  }, []);

  const handleClick1 = (event) => {
    // event.preventDefault();
    setModifDescription(!modifDescription);
    if (modifDescription === true) {
      handleClick1(() => {
        // updateDecisionData();
      });
    }
  };

  const handleClick2 = (event) => {
    // event.preventDefault();
    setModifContext(!modifContext);
    if (modifContext === true) {
      handleClick2(() => {
        // updateDecisionData();
      });
    }
  };

  const handleClick3 = (event) => {
    // event.preventDefault();
    setModifUtility(!modifUtility);
    if (modifUtility === true) {
      handleClick3(() => {
        // updateDecisionData();
      });
    }
  };

  const handleClick4 = (event) => {
    // event.preventDefault();
    setModifAdvantages(!modifAdvantages);
    if (modifAdvantages === true) {
      handleClick4(() => {
        // updateDecisionData();
      });
    }
  };

  const handleClick5 = (event) => {
    // event.preventDefault();
    setModifInconvenients(!modifInconvenients);
    if (modifInconvenients === true) {
      handleClick5(() => {
        // updateDecisionData();
      });
    }
  };

  return isLoaded ? (
    <div className="decisionContainer">
      <div className="decisionDetailsContainer">
        <div>
          <h1>{JSON.parse(decisions.content).title}</h1>
          <div>
            Par {decisions.firstname} {decisions.lastname}
          </div>
          <div>
            Date de création : {decisions.date_created.substring(0, 10)}
          </div>
          <div>Mis à jour : {decisions.date_update.substring(0, 10)}</div>
        </div>
        {
          // ou utiliser html-react-parser
        }
        <div>
          <details>
            <summary>Description</summary>
            <div
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: JSON.parse(decisions.content).description,
              }}
            />
            {modifDescription && (
              <input
                type="text"
                id="description"
                name="description"
                defaultValue={decisions.content}
              />
            )}
            <button type="button" onClick={handleClick1}>
              {modifDescription
                ? "Valider la description"
                : "Modifier la description"}
            </button>
          </details>
          <details>
            <summary>Contexte</summary>
            <div
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: JSON.parse(decisions.content).context,
              }}
            />
            {modifContext && (
              <input
                type="text"
                id="context"
                name="context"
                defaultValue={decisions.content}
              />
            )}
            <button type="button" onClick={handleClick2}>
              {modifContext ? "Valider le contexte" : "Modifier le contexte"}
            </button>
          </details>
          <details>
            <summary>Utilité</summary>
            <div
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: JSON.parse(decisions.content).utility,
              }}
            />
            {modifUtility && (
              <input
                type="text"
                id="utility"
                name="utility"
                defaultValue={decisions.content}
              />
            )}
            <button type="button" onClick={handleClick3}>
              {modifUtility ? "Valider l'utilité" : "Modifier l'utilité"}
            </button>
          </details>
          <details>
            <summary>Avantages</summary>
            <div
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: JSON.parse(decisions.content).pros,
              }}
            />
            {modifAdvantages && (
              <input
                type="text"
                id="advantages"
                name="advantages"
                defaultValue={decisions.content}
              />
            )}
            <button type="button" onClick={handleClick4}>
              {modifAdvantages
                ? "Valider les avantages"
                : "Modifier les avantages"}
            </button>
          </details>
          <details>
            <summary>Inconvénients</summary>
            <div
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: JSON.parse(decisions.content).cons,
              }}
            />
            {modifInconvenients && (
              <input
                type="text"
                id="inconvenients"
                name="inconvenients"
                defaultValue={decisions.content}
              />
            )}
            <button type="button" onClick={handleClick5}>
              {modifInconvenients
                ? "Valider les inconvénients"
                : "Modifier les inconvénients"}
            </button>
          </details>
          <CommentSection
            id={id}
            comments={comments}
            setComments={setComments}
          />
        </div>
      </div>
      <div>
        {JSON.parse(decisions.content).firstDecision ? (
          <>
            <h3>Première décision prise</h3>
            <div
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: JSON.parse(decisions.content).firstDecision.substring(
                  0,
                  10
                ),
              }}
            />
          </>
        ) : null}
        {JSON.parse(decisions.content).endConflict ? (
          <>
            <h3>Fin de la période de conflit</h3>
            <div
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: JSON.parse(decisions.content).firstDecision.substring(
                  0,
                  10
                ),
              }}
            />
          </>
        ) : null}
        {JSON.parse(decisions.content).finaleDecision ? (
          <>
            <h3>Décision finale</h3>
            <div
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: JSON.parse(decisions.content).firstDecision.substring(
                  0,
                  10
                ),
              }}
            />
          </>
        ) : null}
        {impacted.length > 0 ? (
          <>
            <h3>Personnes impactées</h3>
            <div>
              {impacted.map((person) => (
                <div key={person.id}>{person.text}</div>
              ))}
            </div>
          </>
        ) : null}
        {expert.length > 0 ? (
          <>
            <h3>Personnes expertes</h3>
            <div>
              {expert.map((person) => (
                <div key={person.id}>{person.text}</div>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </div>
  ) : (
    <Spinner />
  );
}
export default DecisionsPage;
