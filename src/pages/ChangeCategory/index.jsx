import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageContainer from "../../components/PageContainer";
import PageHeaderContainer from "../../components/PageHeaderContainer";
import PageContentContainer from "../../components/PageContentContainer";
import { ContainerWithSidebar } from "../../components/ContainerWithSidebar";
import { MdOutlineAddCircle } from "react-icons/md";
import { Form } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import ModalComponent from "../../components/ModalComponent";
import { getCategoryById, updateCategory } from "../../servicesBack/CategoryServices";
import { getAllDomains } from "../../servicesBack/DomainServices";
import ButtonComponent from "../../components/ButtonBack";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { ToastContainer, toast } from 'react-toastify';
import ButtonConfirmRegistration from "../../components/ButtonConfirmRegistration";

function ChangeCategory({
  HandledarkMode,
  isDarkMode,
  decreaseFontSize,
  increaseFontSize,
  logOut,
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [domain, setDomain] = useState([]);
  const [domainId, setDomainId] = useState();
  const [errors, setErrors] = useState({});

  const handleOpenModal = (event) => {
    event.preventDefault();
    if (validateForm()) {
      setShowModal(true);
    }
  };

  const handleCloseModal = () => setShowModal(false);

  const handleEdit = async (event) => {
    event.preventDefault();
    try {
      const response = await updateCategory(id, { name: categoryName, active: true, domains:[{
        id: domainId
      }] });
      if (response) {
        toast.success("Categoria alterada com sucesso!");
        handleCloseModal();
        navigate("/buscarCategoria");
      } else {
        toast.error("Erro ao alterar a categoria.");
      }
    } catch (error) {
      toast.error("Erro ao alterar a categoria.");
    }
  };

  useEffect(() => {
    const fetchCategoryAndDomains = async () => {
      try {
        const categoryResponse = await getCategoryById(id);
        setCategoryName(categoryResponse.data.name);
        setDomainId(categoryResponse.data.domainId);

        const domainResponse = await getAllDomains({filterName: null}, 100);
        setDomain(domainResponse.data.content);
      } catch (error) {
        toast.error("Erro ao carregar dados.");
      }
    };

    fetchCategoryAndDomains();
  }, [id]);

  const handleChangeDomain = (event) => {
    setDomainId(event.target.value);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!categoryName) newErrors.categoryName = "Nome da categoria é obrigatório";
    if (!domainId) newErrors.domainId = "Domínio é obrigatório";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <ContainerWithSidebar
      increaseFontSize={increaseFontSize}
      decreaseFontSize={decreaseFontSize}
      HandledarkMode={HandledarkMode}
      isDarkMode={isDarkMode}
      logOut={logOut}
    >
      <PageContainer>
        <PageHeaderContainer 
        buttonback={
          <ButtonComponent
            size="8rem"
            //bgColor="var(--cinza-primario)"
            textColor="white"
            alternativeText="Voltar"
          ></ButtonComponent>
        }
        icon={<MdOutlineAddCircle style={{ width: 34, marginRight: 5 }} />} 
        title={`Alterar Categoria`} />
        <PageContentContainer>
          <Form onSubmit={handleOpenModal}>
            <Form.Group controlId="NameCategory" className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                value={categoryName}
                onChange={(event) => setCategoryName(event.target.value)}
                isInvalid={!!errors.categoryName}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.categoryName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="domain" className="mb-3">
              <Form.Label>Domínio</Form.Label>
              <Form.Control
                as="select"
                value={domainId}
                onChange={handleChangeDomain}
                isInvalid={!!errors.domainId}
                required
              >
                <option value="">Selecione um domínio</option>
                {domain.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.domainId}
              </Form.Control.Feedback>
            </Form.Group>
            <div className="d-flex justify-content-end mt-auto">
              
              <ButtonConfirmRegistration
                size="10rem"
                bgColor="var(--verde-primario)"
                alternativeText="Confirmar alteração"
                action={handleOpenModal}
              >
                Alterar
                <IoIosArrowForward style={{ marginLeft: 5, width: 12 }} />
              </ButtonConfirmRegistration>
            </div>
          </Form>
          <ModalComponent
            tabIndex="-1"
            bodyContent={"Deseja alterar a Categoria?"}
            show={showModal}
            handleClose={() => {
              handleCloseModal();
              toast.error("Alteração de categoria cancelada.");
            }}
            confirm={handleEdit}
            cancel={() => {
              handleCloseModal();
              toast.error("Alteração de categoria cancelada.");
            }}
          />
        </PageContentContainer>
      </PageContainer>
      <ToastContainer />
    </ContainerWithSidebar>
  );
}

export default ChangeCategory;
