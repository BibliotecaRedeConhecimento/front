import React, { useEffect } from "react";
import PageContainer from "../../components/PageContainer";
import PageHeaderContainer from "../../components/PageHeaderContainer";
import PageContentContainer from "../../components/PageContentContainer";
import { Form } from "react-bootstrap";
import { useState } from "react";
import ButtonModal from "../../components/ButtonModal";
import ModalComponent from "../../components/ModalComponent";
import { getDomainById, updateDomain } from "../../services/DomainServices";
import { useParams } from "react-router-dom";
import { getCategoryById, updateCategory } from "../../services/CategoryServices";

const ChangeDomain = () => {
  const { id } = useParams();

  console.log(id);

  const [showModal, setShowModal] = useState(false);
  const [domainName, setDomainName] = useState("");

  const [namePlaceholder, setNamePlaceholder] = useState();

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleEdit = async (event) => {
    event.preventDefault()
    const response = await updateDomain(id, {
      name: domainName,
      active: true
    }
    );
    const resp = await getDomainById(id)
    console.log(response.data);
    console.log(resp.data)
  };

  const handleName = async () => {
    const response = await getDomainById(id);
    setNamePlaceholder(response.data.name);
  };

  useEffect(() => {
    handleName();
  }, []);

  return (
    <div>
      <PageContainer>
        <PageHeaderContainer title="Alterar Dominio" />
        <PageContentContainer>
          <Form.Group controlId="NameDomain">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="string"
              placeholder={namePlaceholder}
              onChange={(event) => setDomainName(event.target.value)}
            />
          </Form.Group>
          <ButtonModal
            buttonText="Confirmar Alteração"
            onClick={handleOpenModal}
          />

          <ModalComponent
            bodyContent={"Deseja alterar o Dominio?"}
            show={showModal}
            handleClose={handleCloseModal}
            confirm={handleEdit}
          />
        </PageContentContainer>
      </PageContainer>
    </div>
  );
};

export default ChangeDomain;
