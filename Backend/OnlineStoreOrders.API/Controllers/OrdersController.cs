using MediatR;
using Microsoft.AspNetCore.Mvc;
using OnlineStoreOrders.Application.Orders.Commands.CreateOrder;
using OnlineStoreOrders.Application.Orders.Commands.DeleteOrder;
using OnlineStoreOrders.Application.Orders.Commands.UpdateOrder;
using OnlineStoreOrders.Domain.Interfaces;

namespace OnlineStoreOrders.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IOrderReadRepository _readRepo;

        public OrdersController(
            IMediator mediator, 
            IOrderReadRepository readRepo
        )
        {
            _mediator = mediator;
            _readRepo = readRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
            => Ok(await _readRepo.GetAllAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id) 
        {
            var model = await _readRepo.GetByIdAsync(id);
            return model is null ? NotFound() : Ok(model);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateOrderCommand cmd)
        {
            var id = await _mediator.Send(cmd);
            return CreatedAtAction(nameof(Get), new { id }, new { id });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] UpdateOrderCommand cmd)  
        {
            if (id != cmd.OrderId)
                return BadRequest("ID mismatch.");

            var ok = await _mediator.Send(cmd);
            return ok ? Ok(cmd) : NotFound();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var ok = await _mediator.Send(new DeleteOrderCommand(id));
            return ok
                ? Ok(new { success = true, message = "Pedido excluído com sucesso" })
                : NotFound();
        }
    }
}
